import { Component, computed, inject } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { ChessFacade } from '../../store/chess.facade';

@Component({
  selector: 'app-chessboard',
  imports: [SquareComponent],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.css'
})
export class ChessboardComponent {
  chessFacade = inject(ChessFacade);
  squares = Array.from({ length: 64 }, (_, i) => i + 1);

  getChessBoardClass = computed(() => {
    let style = "";
    const currentPlayer = this.chessFacade.currentPlayer();
    if (currentPlayer.color === "black") {
      style = "rotate"
    }
    return `${style} chessboard-body`
  });
}
