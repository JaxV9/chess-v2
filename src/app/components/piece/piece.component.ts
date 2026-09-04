import { Component, inject, input } from '@angular/core';
import { PieceService } from '../../services/piece.service';
import { ChessPiece } from '../../models/models';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css',
})
export class PieceComponent {
  currentRole = input.required<ChessPiece>();

  pieceService = inject(PieceService);

}
