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

  previewOverlay(index: number): string {
    const squaresInPreview = this.chessBoardService.squaresInPreview();
    const isInPreview = squaresInPreview.includes(index);
    if (isInPreview) {
      return this.previewManager(false);
    }
    return '';
  }

  watchPreview() {
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
  }

  public previewManager(isConflictPreview: boolean): string {
    if (isConflictPreview) {
      return 'square-preview preview-conflict'
    }
    return 'square-preview preview'
  }
}
