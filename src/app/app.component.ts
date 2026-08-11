import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessboardComponent } from './components/chessboard/chessboard.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ChessboardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chess-v2';
}
