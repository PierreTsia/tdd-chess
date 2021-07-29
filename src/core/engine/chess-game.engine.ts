import { ChessBoardType, ChessPieceSlug, Color, Coords } from './../../core/types';
import { ChessBoardService, PiecesCoord } from './../../core/board/board.service';
import { IPiece } from '/@/core/pieces/piece.factory';

export type Turn = { from: Coords; to: Coords; meta?: any };
export enum GameStatus {
  On = 'On',
  Check = 'Check',
  CheckMate = 'CheckMate',
  Draw = 'Draw',
}
interface IGameEngine {
  playing: Color;
  turns: any[];
  board: ChessBoardType;
  boardService: ChessBoardService;
  status: GameStatus;
  startGame(): void;
  resetGame(): void;
  playMove({ from, to }: Turn): any;
  playHistory(turns: [Turn, Turn][]): void;
}

export class ChessGameEngine implements IGameEngine {
  playing!: Color;
  turns: any[] = [];
  onGoingTurn: any[] = [];
  status: GameStatus = GameStatus.On;
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

    this.postMoveHook({ from, to });
  }

  public playHistory(turns: [Turn, Turn?][]) {
    this.resetGame();
    turns.forEach(([white, black]) => {
      this.playMove(white);
      if (black) {
        this.playMove(black);
      }
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
      const range = movingPiece.getRange(this.board);
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

  private postMoveHook({ from, to }: Turn) {
    this.verifyCheck();
    this.updateTurns(from, to);
    this.toggleColorPlaying();
  }

  private getAttackedCoords(piecesCoords: PiecesCoord[]) {
    const offensiveMaterial = piecesCoords.filter(({ color }) => color === this.playing);
    return offensiveMaterial.reduce((acc, { coords }) => {
      const piece: IPiece = this.board[coords[0]][coords[1]].piece!;
      if (piece) {
        acc.push(...piece.getRange(this.board));
      }
      return acc;
    }, [] as Coords[]);
  }

  private isKingThreatened(threatenedCoords: Coords[], threatenedKingCoords: [number, number]) {
    return threatenedCoords.some(([row, col]) => row === threatenedKingCoords[0] && col === threatenedKingCoords[1]);
  }

  verifyCheck() {
    const piecesCoords = this.boardService.getState().piecesCoords;
    const kingCoords: Coords = piecesCoords.find(
      pc => pc.piece === ChessPieceSlug.K && pc.color !== this.playing,
    )!.coords;
    const threatenedCoords: Coords[] = this.getAttackedCoords(piecesCoords);

    if (this.isKingThreatened(threatenedCoords, kingCoords)) {
      this.status = GameStatus.Check;
    }
  }
}
