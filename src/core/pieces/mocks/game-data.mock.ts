import { Turn } from './../../../core/engine/chess-game.engine';

export const SIMPLE_CHECK: [Turn, Turn][] = [
  [
    { from: [6, 3], to: [4, 3] },
    { from: [1, 4], to: [2, 4] },
  ],
  [
    { from: [7, 6], to: [5, 5] },
    { from: [0, 5], to: [4, 1] },
  ],
];
