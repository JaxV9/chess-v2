import { Component, effect, inject, input, signal } from '@angular/core';
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

  label = input<string>();
  value = input<string>();
  confirmation = input<string>();
  icon = input<string>();

  shareBtnText = signal<string>('');

  constructor() {
    effect(() => {
      const label = this.label()
      if (label) {
        this.shareBtnText.set(label)
      }
    })
  }

  copyToClipBoard() {
    const value = this.value();
    const confirmation = this.confirmation();
    if (!value) return;
    this.clipboard.copy(value);
    if (!confirmation) return;
    this.shareBtnText.set(confirmation)
  }
}
