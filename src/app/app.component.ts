import { Component, inject, OnInit } from '@angular/core';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessFacade } from './store/chess.facade';
import { MenuComponent } from './components/menu/menu.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';

@Component({
  selector: 'app-root',
  imports: [ChessboardComponent, MenuComponent, GameInfosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'chess-v2';

  chessFacade = inject(ChessFacade);

  ngOnInit(): void {
    this.chessFacade.loadGuest();
    this.chessFacade.loadInfos();
  }
}
