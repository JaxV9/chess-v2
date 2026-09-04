import { Component, effect, inject, OnInit } from '@angular/core';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessFacade } from './store/chess.facade';
import { MenuComponent } from './components/menu/menu.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShareComponent } from './components/share/share.component';

@Component({
  selector: 'app-root',
  imports: [ChessboardComponent, MenuComponent, GameInfosComponent, ShareComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'chess-v2';

  chessFacade = inject(ChessFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  gameSessionParam = toSignal(this.route.queryParamMap.pipe(
    map(params => params.get('gamesession'))
  ));

  constructor() {
    effect(() => {
      const gameSession = this.gameSessionParam();
      const guest = this.chessFacade.guest();
      if (guest && gameSession) {
        this.chessFacade.joinGameSession(gameSession);
        //remove game session query param
        this.router.navigate([], {
          queryParams: {
            gamesession: null
          },
        });
      }
    });

    effect(() => {
      if (!this.chessFacade.gameIsStarted() && this.chessFacade.gameSession()) {
        this.chessFacade.resumeGame();
      }
    })
  }

  ngOnInit(): void {
    this.chessFacade.loadGuest();
    this.chessFacade.loadInfos();
  }
}
