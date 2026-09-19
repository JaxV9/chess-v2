import { Component, computed, inject } from '@angular/core';
import { SquareComponent } from '../square/square.component';
import { ChessFacade } from '../../store/chess.facade';
import { ShareComponent } from '../share/share.component';

@Component({
  selector: 'app-chessboard',
  imports: [SquareComponent, ShareComponent],
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

  getWaitingClass = computed(() => {
    let style = "";
    const currentPlayer = this.chessFacade.currentPlayer();
    if (currentPlayer.color === "black") {
      style = "rotate"
    }
    return `${style} waiting-container`
  });

  getHorizontalLabels = computed(() => {
    const list = ["a", "b", "c", "d", "e", "f", "g", "h"];
    if (this.chessFacade.currentPlayer().color === "black") {
      return list.reverse()
    }
    return list
  })

  getVerticalLabels = computed(() => {
    const list = ["1", "2", "3", "4", "5", "6", "7", "8"];
    if (this.chessFacade.currentPlayer().color === "black") {
      return list
    }
    return list.reverse()
  })
}
