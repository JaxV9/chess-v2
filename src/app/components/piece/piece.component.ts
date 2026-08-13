import { Component, inject } from '@angular/core';
import { PieceService } from '../../services/piece.service';

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [],
  templateUrl: './piece.component.html',
  styleUrl: './piece.component.css',
  providers: [PieceService]
})
export class PieceComponent {
  pieceService = inject(PieceService);

  currentRole() {

  }
}
