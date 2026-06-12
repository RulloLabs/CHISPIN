import { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei';
import type * as THREE from 'three';
import { RotateCcw, Smartphone } from 'lucide-react';

// Preload for faster first render
useGLTF.preload('/models/chispin.glb');

/* ─── Gyroscope Hook ─────────────────────────────────────────────────────── */

function useGyroscope() {
  const [gyro, setGyro] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const requestPermission = useCallback(async () => {
    // iOS 13+ requires permission
    const DevOri = (DeviceOrientationEvent as any);
    if (typeof DevOri?.requestPermission === 'function') {
      try {
        const res = await DevOri.requestPermission();
        if (res === 'granted') {
          setEnabled(true);
          setAvailable(true);
        }
      } catch {
        setEnabled(false);
      }
    } else {
      // Android / desktop – no permission needed
      setEnabled(true);
      setAvailable(true);
    }
  }, []);

  useEffect(() => {
    // Detect support
    if ('DeviceOrientationEvent' in window) setAvailable(true);

    if (!enabled) return;

    const handler = (e: DeviceOrientationEvent) => {
      setGyro({
        alpha: e.alpha ?? 0,
        beta:  e.beta  ?? 0,
        gamma: e.gamma ?? 0,
      });
    };

    window.addEventListener('deviceorientation', handler, true);
    return () => window.removeEventListener('deviceorientation', handler, true);
  }, [enabled]);

  return { gyro, available, enabled, requestPermission };
}

/* ─── Model ──────────────────────────────────────────────────────────────── */

interface ModelProps {
  autoRotate: boolean;
  gyroOffset: { x: number; y: number };
  scale?: number;
}

function Model({ autoRotate, gyroOffset, scale = 2.1 }: ModelProps) {
  const { scene } = useGLTF('/models/chispin.glb');
  const groupRef = useRef<THREE.Group>(null);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);
  const currentRotY = useRef(0);
  const currentRotX = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      targetRotY.current += delta * 0.38;
      // Subtle breathing bob
      targetRotX.current = Math.sin(Date.now() * 0.0008) * 0.04;
    } else {
      // Gyroscope influence when not auto-rotating
      targetRotY.current += gyroOffset.y * delta * 0.8;
      targetRotX.current = gyroOffset.x * 0.015;
    }

    // Smooth lerp
    currentRotY.current += (targetRotY.current - currentRotY.current) * Math.min(delta * 4, 1);
    currentRotX.current += (targetRotX.current - currentRotX.current) * Math.min(delta * 5, 1);

    groupRef.current.rotation.y = currentRotY.current;
    groupRef.current.rotation.x = currentRotX.current;
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.55, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Loading Ring ───────────────────────────────────────────────────────── */

function LoadingRing() {
  const ref = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 1.8;
    if (inner.current) inner.current.rotation.z -= delta * 2.5;
  });
  return (
    <group>
      <mesh ref={ref}>
        <torusGeometry args={[0.7, 0.06, 8, 40]} />
        <meshStandardMaterial color="#FF7A00" emissive="#FF4400" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[0.45, 0.04, 8, 30]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Camera rig controlled by OrbitControls + gyro ─────────────────────── */

function CameraController({
  gyroEnabled,
  gyro,
  interacted,
}: {
  gyroEnabled: boolean;
  gyro: { beta: number; gamma: number };
  interacted: boolean;
}) {
  const { camera } = useThree();
  const basePos = useRef({ x: 0, y: 0.5, z: 5.5 });

  useFrame((_, delta) => {
    if (gyroEnabled && !interacted) {
      // Map gamma (-45..45) to X offset, beta (0..90) to Y offset
      const targetX = (gyro.gamma / 45) * -0.35;
      const targetY = 0.5 + ((gyro.beta - 45) / 45) * 0.25;

      basePos.current.x += (targetX - basePos.current.x) * Math.min(delta * 2.5, 1);
      basePos.current.y += (targetY - basePos.current.y) * Math.min(delta * 2.5, 1);

      camera.position.x = basePos.current.x;
      camera.position.y = basePos.current.y;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export interface Chispin3DProps {
  className?: string;
  showControls?: boolean;
  autoRotateDefault?: boolean;
  lightPreset?: 'studio' | 'sunset' | 'dawn' | 'night' | 'city' | 'forest';
  /** When true the canvas bg is transparent to show parent background */
  transparentBg?: boolean;
}

export function Chispin3D({
  className = '',
  showControls = true,
  autoRotateDefault = true,
  lightPreset = 'studio',
  transparentBg = false,
}: Chispin3DProps) {
  const [autoRotate, setAutoRotate]   = useState(autoRotateDefault);
  const [interacted, setInteracted]   = useState(false);
  const [showHint, setShowHint]       = useState(false);
  const orbitRef = useRef<any>(null);

  const { gyro, available: gyroAvailable, enabled: gyroEnabled, requestPermission } = useGyroscope();

  // Gyro offset for model micro-tilt (when gyro is enabled but orbit is active)
  const gyroOffset = {
    x: gyroEnabled ? (gyro.beta - 45) / 45 : 0,
    y: gyroEnabled ? gyro.gamma / 45 : 0,
  };

  // Show drag/touch hint after 1.5 s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const handlePointerDown = () => {
    setInteracted(true);
    setAutoRotate(false);
  };

  const handleReset = () => {
    orbitRef.current?.reset();
    setAutoRotate(autoRotateDefault);
    setInteracted(false);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(v => {
      if (!v) setInteracted(false);
      return !v;
    });
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className={`relative w-full h-full select-none touch-none ${className}`}>

      {/* Immersive ambient glow – always visible even with transparent bg */}
      <div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 65%, rgba(255,122,0,0.22) 0%, rgba(139,92,246,0.14) 50%, transparent 78%)',
        }}
      />

      {/* Particle sparkles (CSS only, no perf hit) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="chispin-sparkle"
            style={{
              left: `${15 + i * 13}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Touch / drag hint */}
      {showHint && !interacted && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce-slow">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] text-white/65 border border-white/12"
            style={{ background: 'rgba(10,5,22,0.78)', backdropFilter: 'blur(12px)' }}
          >
            <span>{isMobile ? '👆 Arrastra para rotar · Pellizca para zoom' : '🖱️ Arrastra para rotar · Rueda para zoom'}</span>
          </div>
        </div>
      )}

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: isMobile ? 38 : 32 }}
        gl={{ alpha: transparentBg, antialias: !isMobile, powerPreference: 'high-performance' }}
        style={{ background: transparentBg ? 'transparent' : undefined, touchAction: 'none' }}
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.5 : 2]}
        onPointerDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        {/* Lighting rig */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.6}
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 3, -4]} intensity={0.3} color="#a78bfa" />
        <pointLight position={[0, 4, 2]} intensity={1.1} color="#FF9A33" />
        <pointLight position={[2, -1, 3]} intensity={0.5} color="#FF7A00" />
        <spotLight
          position={[0, 7, 0]}
          angle={0.35}
          penumbra={0.9}
          intensity={0.8}
          color="#ffffff"
          castShadow={false}
        />

        <Suspense fallback={<LoadingRing />}>
          <Model
            autoRotate={autoRotate && !interacted}
            gyroOffset={gyroOffset}
            scale={2.1}
          />

          <OrbitControls
            ref={orbitRef}
            enablePan={false}
            enableZoom
            minDistance={3.2}
            maxDistance={9}
            minPolarAngle={Math.PI / 10}
            maxPolarAngle={Math.PI / 1.75}
            dampingFactor={0.06}
            enableDamping
            autoRotate={false}
            touches={{ ONE: 1 /* ROTATE */, TWO: 2 /* DOLLY_PAN */ }}
          />

          {!isMobile && (
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.5}
              scale={4}
              blur={2.5}
              far={2}
              color="#14082a"
            />
          )}

          <Environment preset={lightPreset} />
        </Suspense>

        {/* Gyroscope camera controller */}
        <CameraController
          gyroEnabled={gyroEnabled}
          gyro={{ beta: gyro.beta, gamma: gyro.gamma }}
          interacted={interacted}
        />
      </Canvas>

      {/* UI Controls */}
      {showControls && (
        <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-2">
          {/* Auto-rotate toggle */}
          <button
            onClick={toggleAutoRotate}
            title={autoRotate ? 'Detener rotación' : 'Activar rotación'}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-lg active:scale-90 ${
              autoRotate && !interacted
                ? 'bg-chispa border-chispa text-negro scale-105'
                : 'bg-negro/80 border-white/20 text-white/60 hover:text-white hover:border-white/40'
            }`}
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Reset view */}
          {interacted && (
            <button
              onClick={handleReset}
              title="Restablecer vista"
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 bg-negro/80 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 shadow-lg active:scale-90"
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <RotateCcw className="w-4 h-4 scale-x-[-1]" />
            </button>
          )}

          {/* Gyroscope button (mobile only) */}
          {gyroAvailable && (
            <button
              onClick={requestPermission}
              title={gyroEnabled ? 'Giroscopio activo' : 'Activar giroscopio'}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 shadow-lg active:scale-90 ${
                gyroEnabled
                  ? 'bg-violet-500 border-violet-400 text-white scale-105'
                  : 'bg-negro/80 border-white/20 text-white/50 hover:text-violet-400 hover:border-violet-400/50'
              }`}
              style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* 3D badge */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-col gap-1.5">
        <div
          className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-chispa border border-chispa/35"
          style={{ background: 'rgba(10,6,22,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          3D INTERACTIVO
        </div>
        {gyroEnabled && (
          <div
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-violet-400 border border-violet-400/35 flex items-center gap-1"
            style={{ background: 'rgba(10,6,22,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
            Giroscopio
          </div>
        )}
      </div>
    </div>
  );
}
