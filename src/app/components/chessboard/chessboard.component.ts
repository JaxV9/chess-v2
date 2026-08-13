import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';

@Component({
    selector: 'app-chessboard',
    imports: [SquareComponent],
    templateUrl: './chessboard.component.html',
    styleUrl: './chessboard.component.css'
})
export class ChessboardComponent {
  squares = Array.from({ length: 64 }, (_, i) => i + 1);
}
