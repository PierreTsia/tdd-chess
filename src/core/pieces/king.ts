import { IPiece } from './piece.factory';
import { ChessMoveService } from '../board/chessMoveService';
import { ChessPiece } from './chess-piece';
import { ChessBoardType, ChessPieceSlug, Color, Coords } from './../../core/types';

interface IKing extends IPiece {}

export class King extends ChessPiece implements IKing {
  movesService: ChessMoveService = new ChessMoveService();
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.K;
  }
  getRange(board: ChessBoardType): Coords[] {
    super.getRange(board);

    return [...this.regularMoves, ...this.castleMoves];
  }

  get regularMoves() {
    return [
      ...this.movesService.moveOneSquareDiagonal(this.coords),
      ...this.movesService.moveOneSquareVertically(this.coords),
      ...this.movesService.moveOneSquareHorizontally(this.coords),
    ].filter(c => this.movesService.isEmptySquare(c) || !this.movesService.hasAlly(c, this.color));
  }

  get castleMoves(): Coords[] {
    return !this.isStillAtStart || this.hasMoved
      ? []
      : [
          ...this.movesService.kingSideCastleSquares(this.color),
          ...this.movesService.queenSideCastleSquares(this.color),
        ];
  }

  get originalCoords(): Coords {
    return this.color === Color.White ? [7, 4] : [0, 4];
  }

  get isStillAtStart(): boolean {
    return this.originalCoords[0] === this.coords[0] && this.originalCoords[1] === this.coords[1];
  }
}
