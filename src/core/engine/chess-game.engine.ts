import { ChessBoardType, Color, Coords } from './../../core/types';
import { ChessBoardService } from './../../core/board/board.service';
import { IPiece } from '/@/core/pieces/piece.factory';

export type Turn = { from: Coords; to: Coords; meta?: any };
interface IGameEngine {
  playing: Color;
  turns: any[];
  board: ChessBoardType;
  boardService: ChessBoardService;
  startGame(): void;
  resetGame(): void;
  playMove({ from, to }: Turn): any;
  playHistory(turns: [Turn, Turn][]): void;
}

export class ChessGameEngine implements IGameEngine {
  playing!: Color;
  turns: any[] = [];
  onGoingTurn: any[] = [];
  boardService = new ChessBoardService();

  constructor() {
    this.resetGame();
  }

  public startGame() {
    this.playing = Color.White;
    this.boardService.init();
  }

  public resetGame() {
    this.boardService.reset();
    this.turns = [];
    this.onGoingTurn = [];
    this.playing = Color.White;
    this.boardService.init();
  }

  public playMove({ from, to }: Turn) {
    if (!this.isValidPieceMove({ from, to }) || !this.isColorTurn(from)) {
      throw new Error(`Invalid move: from ${from} to ${to}`);
    }
    this.boardService.movePiece(from, to);
    this.updateTurns(from, to);
    this.toggleColorPlaying();
  }

  public playHistory(turns: [Turn, Turn][]) {
    this.resetGame();
    turns.forEach(([white, black]) => {
      this.playMove(white);
      this.playMove(black);
    });
  }

  get board(): ChessBoardType {
    return this.boardService.board;
  }

  private updateTurns(from: Coords, to: Coords) {
    this.onGoingTurn.push({ from, to });
    if (this.onGoingTurn.length === 2) {
      this.turns.push(this.onGoingTurn);
      this.onGoingTurn = [];
    }
  }

  private isValidPieceMove({ from, to }: Turn): boolean {
    const [row, col] = from;
    const [destRow, destCol] = to;
    const movingPiece: IPiece = this.board[row][col].piece!;
    if (movingPiece) {
      const state = this.boardService.getState();
      const range = movingPiece.getRange(state);
      return range.some(([row, col]: Coords) => row === destRow && col === destCol);
    }
    return false;
  }

  private isColorTurn([row, col]: Coords): Boolean {
    const movingPiece: IPiece = this.board[row][col].piece!;
    return movingPiece && movingPiece.color === this.playing;
  }

  private toggleColorPlaying(): void {
    this.playing = this.playing === Color.White ? Color.Black : Color.White;
  }
}
