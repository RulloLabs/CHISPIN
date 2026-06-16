import { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { CameraView, ClawPosition } from './types';
import { CHISPINES } from './helpers';

/* ─── Backdrop (interior fair scene) ────────────────────────────────── */

function BackdropPlane() {
  const texture = useTexture('/images/machine-backdrop.svg');
  return (
    <mesh position={[0, -0.5, -5]} scale={[10, 6, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.7} depthWrite={false} />
    </mesh>
  );
}

/* ─── Claw (GLB) ────────────────────────────────────────────────────── */

interface ClawProps {
  position: THREE.Vector3;
  isCatching: boolean;
  catchSuccess: boolean | null;
  onCatchComplete: (success: boolean) => void;
  grabbedPosRef: React.MutableRefObject<{ y: number }>;
}

const TARGET_MACHINE_HEIGHT = 14;
const CLAW_TOP = TARGET_MACHINE_HEIGHT * 0.3;
const CLAW_BOTTOM = -TARGET_MACHINE_HEIGHT * 0.35;

function ClawGLB({ position, isCatching, catchSuccess, onCatchComplete, grabbedPosRef }: ClawProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/gancho.glb');
  const { cloned, clawScale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const s = TARGET_MACHINE_HEIGHT * 0.04 / Math.max(Math.max(size.x, size.y, size.z), 0.001);
    return { cloned: clone, clawScale: s };
  }, [scene]);

  useEffect(() => {
    if (!groupRef.current || catchSuccess === null) return;

    if (catchSuccess === true) {
      const tl = gsap.timeline({ onComplete: () => onCatchComplete(true) });
      tl.to(groupRef.current.position, { y: CLAW_BOTTOM, duration: 1.1, ease: 'power2.in' });
      tl.to(groupRef.current.position, {
        y: CLAW_TOP,
        duration: 1.1,
        ease: 'power2.out',
        onUpdate: () => { grabbedPosRef.current.y = groupRef.current!.position.y - 1.5; },
      });
    } else {
      const tl = gsap.timeline({ onComplete: () => onCatchComplete(false) });
      tl.to(groupRef.current.position, { y: CLAW_BOTTOM * 0.8, duration: 0.2, ease: 'back.out' });
      tl.to(groupRef.current.position, { y: CLAW_BOTTOM * 1.1, duration: 0.18, ease: 'power2.in' });
      tl.to(groupRef.current.position, { y: CLAW_TOP, duration: 0.85, ease: 'power2.out' });
    }
  }, [catchSuccess]);

  useEffect(() => {
    if (!isCatching && groupRef.current) groupRef.current.position.y = CLAW_TOP;
  }, [isCatching]);

  useEffect(() => {
    if (groupRef.current && !isCatching) {
      groupRef.current.position.x = position.x;
      groupRef.current.position.z = position.z;
    }
  }, [position.x, position.z, isCatching]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (!isCatching) groupRef.current.rotation.z = Math.sin(Date.now() * 0.00085) * 0.012;
  });

  return (
    <group ref={groupRef} position={[0, CLAW_TOP, 0]}>
      <primitive object={cloned} scale={clawScale} />
    </group>
  );
}

/* ─── Chispin GLB Instance ───────────────────────────────────────────── */

interface ChispinInstanceProps {
  position: [number, number, number];
  scale: number;
  baseY: number;
  floatSpeed: number;
  floatOffset: number;
  isGrabbed: boolean;
  grabbedPosRef: React.MutableRefObject<{ y: number }>;
}

function ChispinInstance({ position, scale, baseY, floatSpeed, floatOffset, isGrabbed, grabbedPosRef }: ChispinInstanceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/chispin.glb');
  const { cloned, chispinScale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = 0.6 / Math.max(maxDim, 0.001);
    return { cloned: clone, chispinScale: s };
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;
    if (isGrabbed) {
      groupRef.current.position.y = grabbedPosRef.current.y;
    } else {
      const t = Date.now() * 0.001;
      groupRef.current.position.y = baseY + Math.sin(t * floatSpeed + floatOffset) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale * chispinScale} rotation={[0, Math.PI, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

/* ─── Chispines Manager ──────────────────────────────────────────────── */

interface ChispinesProps {
  grabbedIndex: number | null;
  grabbedPosRef: React.MutableRefObject<{ y: number }>;
}

function Chispines({ grabbedIndex, grabbedPosRef }: ChispinesProps) {
  const chispines = useMemo(() =>
    CHISPINES.map((d, i) => ({
      id: i,
      position: [d.x, d.y, d.z] as [number, number, number],
      scale: d.scale,
      baseY: d.y,
      floatSpeed: 0.3 + Math.random() * 0.5,
      floatOffset: Math.random() * Math.PI * 2,
    })),
    [],
  );

  return (
    <group>
      {chispines.map((c) => (
        <ChispinInstance
          key={c.id}
          position={c.position}
          scale={c.scale}
          baseY={c.baseY}
          floatSpeed={c.floatSpeed}
          floatOffset={c.floatOffset}
          isGrabbed={grabbedIndex === c.id}
          grabbedPosRef={grabbedPosRef}
        />
      ))}
    </group>
  );
}

/* ─── Camera Controller ──────────────────────────────────────────────── */

interface CameraControllerProps {
  view: CameraView;
}

function CameraController({ view }: CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    const dist = 14;
    const angle = view === 'left' ? -Math.PI / 2 : view === 'right' ? Math.PI / 2 : 0;
    gsap.to(camera.position, {
      x: dist * Math.sin(angle),
      y: 3,
      z: dist * Math.cos(angle),
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [view, camera]);

  useFrame(() => { camera.lookAt(0, 1.5, 0); });

  return null;
}

/* ─── Scene Content ──────────────────────────────────────────────────── */

interface SceneContentProps {
  clawPos: ClawPosition;
  cameraView: CameraView;
  isCatching: boolean;
  catchSuccess: boolean | null;
  grabbedIndex: number | null;
  onCatchComplete: (success: boolean) => void;
}

function SceneContent({ clawPos, cameraView, isCatching, catchSuccess, grabbedIndex, onCatchComplete }: SceneContentProps) {
  const clawVec = useMemo(() => new THREE.Vector3(clawPos.x, 2.2, clawPos.z), [clawPos.x, clawPos.z]);
  const grabbedPosRef = useRef({ y: 0 });

  useEffect(() => { clawVec.set(clawPos.x, clawVec.y, clawPos.z); }, [clawPos.x, clawPos.z]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 15, 8]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-6, 8, -4]} intensity={4} distance={30} color="#7B2FBE" />
      <pointLight position={[6, 6, 6]} intensity={3} distance={25} color="#FFB800" />
      <pointLight position={[0, 10, 0]} intensity={5} distance={25} color="#FF4D00" />
      <BackdropPlane />
      <Chispines grabbedIndex={grabbedIndex} grabbedPosRef={grabbedPosRef} />
      <ClawGLB
        position={clawVec}
        isCatching={isCatching}
        catchSuccess={catchSuccess}
        onCatchComplete={onCatchComplete}
        grabbedPosRef={grabbedPosRef}
      />
      <CameraController view={cameraView} />
    </>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */

interface Maquina3DProps {
  clawPos: ClawPosition;
  cameraView: CameraView;
  isCatching: boolean;
  catchSuccess: boolean | null;
  grabbedIndex: number | null;
  onCatchComplete: (success: boolean) => void;
}

export function Maquina3D(props: Maquina3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 3, 14], fov: 35, near: 0.1, far: 100 }}
      gl={{ antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      shadows
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
