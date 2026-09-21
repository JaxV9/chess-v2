import { Component, computed, effect, inject } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-game-infos',
  imports: [PieceComponent],
  templateUrl: './game-infos.component.html',
  styleUrl: './game-infos.component.css',
})
export class GameInfosComponent {
  chessFacade = inject(ChessFacade);

  getCurrentUserPiecesCaptured = computed(() => {
    if (this.chessFacade.currentPlayer().color === "black") {
      return this.chessFacade.whitePiecesCaptured();
    }
    return this.chessFacade.blackPiecesCaptured();
  })

  getOpponentPiecesCaptured = computed(() => {
    if (this.chessFacade.opponent()?.color === "black") {
      return this.chessFacade.whitePiecesCaptured();
    }
    return this.chessFacade.blackPiecesCaptured();
  })

  getRole(id: string): string {
    const [piece, colorCode] = id.split('_');
    if (!piece || !colorCode) return '';
    const color = colorCode.startsWith('w') ? 'white' : colorCode.startsWith('b') ? 'black' : '';
    return color ? `${piece}_${color}` : '';
  }

}
