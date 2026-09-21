import { Component, computed, ElementRef, effect, inject, viewChild } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { ChessBoardService } from '../../services/chessBoard.service';

export interface HistoryRow {
  turn: number;
  white: { notation: string; isLast: boolean };
  black?: { notation: string; isLast: boolean };
}

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {

  chessFacade = inject(ChessFacade);
  chessBoardService = inject(ChessBoardService);
  historyContainer = viewChild<ElementRef<HTMLDivElement>>('historyContainer');

  constructor() {
    effect(() => {
      this.historyRows();
      setTimeout(() => {
        const el = this.historyContainer()?.nativeElement;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    });
  }

  historyRows = computed<HistoryRow[]>(() => {
    const history = this.chessFacade.history() ?? [];
    const rows: HistoryRow[] = [];
    const totalMoves = history.length;

    for (let i = 0; i < totalMoves; i += 2) {
      const whiteMove = history[i];
      const blackMove = history[i + 1];

      rows.push({
        turn: Math.floor(i / 2) + 1,
        white: {
          notation: this.chessBoardService.getSquareNotation(whiteMove.to),
          isLast: i === totalMoves - 1,
        },
        black: blackMove ? {
          notation: this.chessBoardService.getSquareNotation(blackMove.to),
          isLast: (i + 1) === totalMoves - 1,
        } : undefined,
      });
    }

    return rows;
  });

  getUserToPlayColor = computed(() => {
    return this.chessFacade.players()?.find(player => player.username === this.chessFacade.userToPlay())?.color;
  })

}
