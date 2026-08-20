import { Component, inject } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-game-infos',
  imports: [],
  templateUrl: './game-infos.component.html',
  styleUrl: './game-infos.component.css',
})
export class GameInfosComponent {
  chessFacade = inject(ChessFacade);

  gameSession = toSignal(this.chessFacade.gameSession$);
  guest = toSignal(this.chessFacade.guest$);
}
