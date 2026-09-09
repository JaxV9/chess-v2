import { computed, inject, Injectable, signal } from '@angular/core';
import { ChessFacade } from '../store/chess.facade';
import { PieceService } from './piece.service';
import { ChessBoardService } from './chessBoard.service';

@Injectable()
export class SquareService {

  chessFacade = inject(ChessFacade);
  chessBoardService = inject(ChessBoardService);
  pieceService = inject(PieceService);

  index = signal<number | undefined>(undefined);

  currentChessPiece = computed(() => {
    const currentIndex = this.index();
    if (currentIndex === undefined) return
    return this.chessFacade.chessPieces()?.find((chess) => chess.pos === currentIndex)
  })

  isThisIsPiece = computed(() => {
    return this.chessFacade.currentPlayer().color === this.chessBoardService.pieceIsPreviewed()?.color
  })

  currentSquareIsInPreview = computed(() => {
    const index = this.index();
    if (!index) return;
    return this.chessBoardService.squaresInPreview().includes(index);
  })

  hasEnnemyInSquare = computed(() => {
    if (!this.currentChessPiece()) return;
    return this.chessBoardService.pieceIsPreviewed()?.color !== this.currentChessPiece()?.color;
  })

  public colorManager(index: number) {
    let theme: string = '';
    const currentLine: number = Number.isInteger(index / 8) ? index / 8 - 1 : Math.floor(index / 8);
    const pairLine: boolean = currentLine % 2 == 0

    if (pairLine && index % 2 !== 0) {
      theme = "clear"
    }
    if (pairLine && index % 2 == 0) {
      theme = "dark"
    }
    if (!pairLine && index % 2 !== 0) {
      theme = "dark"
    }
    if (!pairLine && index % 2 == 0) {
      theme = "clear"
    }

    return 'square ' + theme;
  }

  watchPreview() {
    if (this.chessFacade.currentPlayer()?.color !== this.currentChessPiece()?.color) return
    const currentChessPiece = this.currentChessPiece();
    if (!currentChessPiece) return;

    const newPreview = this.pieceService.getPreview(currentChessPiece);
    const oldPreview = this.chessBoardService.squaresInPreview();
    if (!newPreview) return;

    this.chessBoardService.squaresInPreview.set([]);
    // reset the preview when we click on the same piece
    if (JSON.stringify(oldPreview) === JSON.stringify(newPreview)) return

    if (newPreview !== oldPreview) {
      this.chessBoardService.squaresInPreview.set([...newPreview]);
    }
    this.chessBoardService.pieceIsPreviewed.set(currentChessPiece);
  }

  makeAMove() {
    const index = this.index();
    const pieceIsPreviewed = this.chessBoardService.pieceIsPreviewed();
    if (!index || !pieceIsPreviewed) return;

    const couldCapture = this.chessBoardService.squaresInPreview().includes(index);

    if (this.hasEnnemyInSquare() && couldCapture) {
      const opponentPiece = this.chessFacade.chessPieces()?.find(piece => piece.pos === index)
      if (!opponentPiece) return;

      let chessPieces = this.chessFacade.chessPieces()?.filter(piece => piece.id !== pieceIsPreviewed.id)
        .map((piece) => {
          if (piece.pos === index) {
            return { ...pieceIsPreviewed, pos: piece.pos }
          }
          return piece
        }).filter(piece => piece.id !== opponentPiece.id);

      if (!chessPieces) return;
      this.chessFacade.makeAMove(chessPieces)
      return;
    }

    if (this.currentSquareIsInPreview()) {
      let chessPieces = this.chessFacade.chessPieces()?.map((piece) => {
        if (piece.id === pieceIsPreviewed.id) {
          return { ...piece, pos: index };
        }
        return piece
      });

      if (!chessPieces) return
      this.chessFacade.makeAMove(chessPieces)

      this.chessBoardService.pieceIsPreviewed.set(undefined);
      this.chessBoardService.squaresInPreview.set([]);
    }
  }

  public previewManager(): string {
    if (this.hasEnnemyInSquare()) {
      return 'square-preview preview-conflict'
    }
    return 'square-preview preview'
  }
}
