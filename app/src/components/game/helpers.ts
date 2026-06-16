import type { CameraView, ClawPosition, Rarity } from './types';

export const ATTEMPTS = 3;
export const ATTEMPT_TIMES = [45, 35, 25];
export const SUCCESS_PROB = [0.08, 0.25, 0.5];
export const CLAW_LIM = { minX: -2.2, maxX: 2.2, minZ: -2.2, maxZ: 2.2 };

export function getRarity(): Rarity {
  const r = Math.random();
  return r < 0.001 ? 'azul' : r < 0.004 ? 'dorado' : r < 0.008 ? 'festivalero' : 'normal';
}

export function getFounderId(): number {
  return Math.floor(Math.random() * 800) + 100;
}

export function isSpecialFounder(id: number): boolean {
  return id % 100 === 0;
}

export function clampClaw(pos: ClawPosition): ClawPosition {
  return {
    x: Math.max(CLAW_LIM.minX, Math.min(CLAW_LIM.maxX, pos.x)),
    z: Math.max(CLAW_LIM.minZ, Math.min(CLAW_LIM.maxZ, pos.z)),
  };
}

export function getCameraPosition(view: CameraView): [number, number, number] {
  const positions: Record<string, [number, number, number]> = {
    front: [0, 1.5, 10.5],
    left: [-10.5, 1, 1.5],
    right: [10.5, 1, -1.5],
  };
  return positions[view];
}

const NEAR_MISS_TEXTS = ['¡¡SE CAE!!', '¡CASI!', '¡¡SE ESCAPA!!', '¡SE SUELTA!'];
export function getRandomNearMissText(): string {
  return NEAR_MISS_TEXTS[Math.floor(Math.random() * NEAR_MISS_TEXTS.length)];
}

export interface ChispinData {
  x: number;
  y: number;
  z: number;
  scale: number;
}

// Relative positions within the machine interior (fractions of interior dimensions)
// Interior is estimated as 70% of the machine's bounding box
export const CHISPINES: ChispinData[] = [
  // Front row — biggest, closest to glass
  { x: -2.0, y: -4.5, z: 2.0, scale: 1.3 },
  { x:  0.0, y: -4.2, z: 2.3, scale: 1.4 },
  { x:  2.0, y: -4.5, z: 2.0, scale: 1.3 },
  // Mid row
  { x: -2.5, y: -4.8, z: 0.0, scale: 1.1 },
  { x:  0.5, y: -4.5, z: 0.2, scale: 1.2 },
  { x:  2.5, y: -4.8, z: 0.0, scale: 1.1 },
  // Center-back
  { x: -1.2, y: -5.0, z: -1.8, scale: 0.9 },
  { x:  1.2, y: -5.0, z: -1.8, scale: 0.9 },
  // Back row — smallest, furthest
  { x: -0.5, y: -5.2, z: -3.0, scale: 0.7 },
  { x:  0.5, y: -5.2, z: -3.0, scale: 0.7 },
];
