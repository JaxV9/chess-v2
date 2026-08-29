import { Component, computed, inject, input } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ChessFacade } from '../../store/chess.facade';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-square',
  imports: [PieceComponent],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
  providers: [SquareService]
})
export class SquareComponent {
  private squareService = inject(SquareService);
  chessFacade = inject(ChessFacade);

  currentIndex = input<number>();

  currentChessPiece = computed(() => {
    const currentIndex = this.currentIndex();
    if (!currentIndex) return
    return this.chessFacade.chessPieces()?.find((chess) => chess.pos === currentIndex)
  })

  currentColor = computed(() => {
    const index = this.currentIndex();
    if (!index) return;

    return this.squareService.colorManager(index);
  })
}
