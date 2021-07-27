import { ChessPieceSlug, Color, Coords, Diagonal, Direction } from './../types';
import { ChessPiece } from './chess-piece';
import { BoardState } from './../../core/board/board.service';
import { IPiece } from './../../core/pieces/piece.factory';

interface IPawn extends IPiece {
  pawnMove(limit: 1 | 2): Coords[];
}

export class Pawn extends ChessPiece implements IPawn {
  private whiteDiagonals: Diagonal[] = [
    [Direction.Up, Direction.Left],
    [Direction.Up, Direction.Right],
  ];
  private blackDiagonals: Diagonal[] = [
    [Direction.Down, Direction.Left],
    [Direction.Down, Direction.Right],
  ];
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

  private get pawnDiagonalMove(): Diagonal[] {
    return this.color === Color.White ? this.whiteDiagonals : this.blackDiagonals;
  }

  private getThreatenedSquares() {
    return this.movesService.moveOneSquareDiagonal(this.coords, this.pawnDiagonalMove);
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
