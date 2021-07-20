import { PieceFactory as Factory } from './piece.factory';
import { Color } from './../types';

describe('|-> Chess Pieces', () => {
  describe('|-> Pawn', () => {
    it('should find two possible origins on white first move', () => {
      const pawn = new Factory.Pawn({ color: Color.White });
      expect(pawn.possibleOrigins([4, 4])).toEqual([
        [5, 4],
        [6, 4],
      ]);
    });

    it('should find two possible origins on black first move', () => {
      const pawn = new Factory.Pawn({ color: Color.Black });
      expect(pawn.possibleOrigins([3, 4])).toEqual([
        [2, 4],
        [1, 4],
      ]);
    });

    it('should throw an error for white pawn if destination is first two rows', () => {
      const pawn = new Factory.Pawn({ color: Color.White });
      expect(() => pawn.possibleOrigins([7, 7])).toThrow();
      expect(() => pawn.possibleOrigins([6, 6])).toThrow();
      expect(() => pawn.possibleOrigins([0, 0])).not.toThrow();
      expect(() => pawn.possibleOrigins([1, 1])).not.toThrow();
    });

    it('should throw an error for black pawn if destination is last two rows', () => {
      const pawn = new Factory.Pawn({ color: Color.Black });
      expect(() => pawn.possibleOrigins([0, 0])).toThrow();
      expect(() => pawn.possibleOrigins([1, 1])).toThrow();
      expect(() => pawn.possibleOrigins([6, 6])).not.toThrow();
      expect(() => pawn.possibleOrigins([7, 7])).not.toThrow();
    });

    it('should return only one possible origin unless from possible starting row', () => {
      const whitePawn = new Factory.Pawn({ color: Color.White });
      expect(whitePawn.possibleOrigins([4, 4])).toEqual([
        [5, 4],
        [6, 4],
      ]);
      expect(whitePawn.possibleOrigins([4, 2])).toEqual([
        [5, 2],
        [6, 2],
      ]);
      expect(whitePawn.possibleOrigins([2, 4])).toEqual([[3, 4]]);

      const blackPawn = new Factory.Pawn({ color: Color.Black });
      expect(blackPawn.possibleOrigins([4, 4])).toEqual([[3, 4]]);
      expect(blackPawn.possibleOrigins([4, 3])).toEqual([[3, 3]]);
      expect(blackPawn.possibleOrigins([3, 4])).toEqual([
        [2, 4],
        [1, 4],
      ]);
    });
  });
});
