import { Component, computed, effect, inject, input } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ChessFacade } from '../../store/chess.facade';
import { PieceComponent } from '../piece/piece.component';
import { PieceService } from '../../services/piece.service';

@Component({
  selector: 'app-square',
  imports: [PieceComponent],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
  providers: [SquareService, PieceService]
})
export class SquareComponent {
  squareService = inject(SquareService);
  chessFacade = inject(ChessFacade);

  currentIndex = input.required<number>();

  constructor() {
    effect(() => {
      this.squareService.index.set(this.currentIndex());
    })
  }

}
