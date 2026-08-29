import { Component, inject } from '@angular/core';
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
}
