import { Component, inject, OnInit } from '@angular/core';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessFacade } from './store/chess.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuComponent } from './components/menu/menu.component';
import { GameInfosComponent } from './components/game-infos/game-infos.component';

@Component({
  selector: 'app-root',
  imports: [ChessboardComponent, MenuComponent, GameInfosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chess-v2';
}
