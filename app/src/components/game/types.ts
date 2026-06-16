export type CameraView = 'front' | 'left' | 'right';
export type GamePhase = 'intro' | 'playing' | 'nearmiss' | 'victory' | 'reserve' | 'noattempts';
export type Rarity = 'normal' | 'festivalero' | 'dorado' | 'azul';

export interface ClawPosition {
  x: number;
  z: number;
}

export interface GameState {
  phase: GamePhase;
  attemptsLeft: number;
  timerSec: number;
  cameraView: CameraView;
  clawPos: ClawPosition;
  isCatching: boolean;
  founderId: number;
  rarity: Rarity;
  nearMissText: string;
}
