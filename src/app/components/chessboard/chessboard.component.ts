import { Component } from '@angular/core';

@Component({
  selector: 'app-chessboard',
  standalone: true,
  imports: [],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.css'
})
export class ChessboardComponent {
  squares = Array.from({ length: 64 }, (_, i) => i + 1);
}
