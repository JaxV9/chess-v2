import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessboardComponent } from './components/chessboard/chessboard.component';
import { ChessFacade } from './store/chess.facade';
import { HttpService } from './services/http.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ChessboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chess-v2';
  chessFacade = inject(ChessFacade);

  gameSession = toSignal(this.chessFacade.gameSession$);
}
