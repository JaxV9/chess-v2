import { Component, effect, inject, OnInit } from '@angular/core';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessFacade } from './store/chess.facade';
import { MenuComponent } from './components/menu/menu.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ChessboardComponent, MenuComponent, GameInfosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'chess-v2';

  chessFacade = inject(ChessFacade);
  private route = inject(ActivatedRoute);

  gameSession = toSignal(this.route.queryParamMap.pipe(
    map(params => params.get('gamesession'))
  ));

  constructor() {
    effect(() => {
      const gameSession = this.gameSession();
      const guest = this.chessFacade.guest();
      if (guest && gameSession) {
        this.chessFacade.joinGameSession(gameSession);
      }
    })
  }

  ngOnInit(): void {
    this.chessFacade.loadGuest();
    this.chessFacade.loadInfos();
  }
}
