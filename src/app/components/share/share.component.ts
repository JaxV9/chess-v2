import { Component, inject, signal } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-share',
  imports: [],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent {
  chessFacade = inject(ChessFacade);
  clipboard = inject(Clipboard);
  document = inject(DOCUMENT);

  shareBtnText = signal<string>("Share the link with a friend");

  copyToClipBoard() {
    const gameSession = this.chessFacade.gameSession();
    const baseUrl = this.document.location.origin;
    this.clipboard.copy(`${baseUrl}?gamesession=${gameSession}`)
    this.shareBtnText.set('Link copied')
  }
}
