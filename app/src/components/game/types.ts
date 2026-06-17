export type CameraView = 'front' | 'left' | 'right';
export type GamePhase = 'intro' | 'playing' | 'victory' | 'reserve' | 'noattempts';
export type Rarity = 'normal' | 'festivalero' | 'dorado' | 'azul' | 'legendario';

export interface ClawPosition {
  x: number;
  z: number;
}
