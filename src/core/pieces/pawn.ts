import { ChessPieceSlug, Color, Coords, Direction } from './../types';
import { ChessPiece } from './chess-piece';
import { BoardState } from './../../core/board/board.service';
import { IPiece } from './../../core/pieces/piece.factory';

interface IPawn extends IPiece {
  pawnMove(limit: 1 | 2): Coords[];
}

export class Pawn extends ChessPiece implements IPawn {
  constructor(opts: any) {
    super(opts);
    this.type = ChessPieceSlug.P;
    this.coords = opts.coords;
  }

  getRange(board: BoardState): Coords[] {
    this.movesService.populate(board);
    const advanceMove = this.pawnMove(this.pawnReach).filter(c => this.movesService.isEmptySquare(c));
    return [...advanceMove, ...this.takeMoves];
  }

  pawnMove(limit: number): Coords[] {
    return this.movesService.moveUpOrDown(this.coords, limit, this.direction);
  }

  private get pawnReach(): 1 | 2 {
    return this.canMoveTwoSquares ? 2 : 1;
  }

  private get takeMoves(): Coords[] {
    const threatenedSquares: Coords[] = this.getThreatenedSquares();
    return threatenedSquares.filter(c => this.movesService.hasOpponent(c, this.color));
  }

  private get pawnDiagonalMove(): [Direction.Up | Direction.Down, Direction.Left | Direction.Right][] {
    return this.color === Color.White
      ? [
          [Direction.Up, Direction.Left],
          [Direction.Up, Direction.Right],
        ]
      : [
          [Direction.Down, Direction.Left],
          [Direction.Down, Direction.Right],
        ];
  }

  private getThreatenedSquares() {
    return this.movesService.moveDiagonal(this.coords, 1, this.pawnDiagonalMove); /*this.color === Color.White
      ? [...this.movesService.moveUpLeft(this.coords, 1), ...this.movesService.moveUpRight(this.coords, 1)].filter(
          Boolean,
        )
      : [...this.movesService.moveDownLeft(this.coords, 1), ...this.movesService.moveDownRight(this.coords, 1)].filter(
          Boolean,
        );*/
  }

  private get startingRow(): number {
    return this.color === Color.White ? 6 : 1;
  }

  private get canMoveTwoSquares(): boolean {
    return this.coords[0] === this.startingRow;
  }

  private get direction(): Direction.Up | Direction.Down {
    return this.color === Color.White ? Direction.Up : Direction.Down;
  }
}
