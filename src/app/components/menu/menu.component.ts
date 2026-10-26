import { Component, computed, inject, signal } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-menu',
  imports: [MatProgressSpinnerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  chessFacade = inject(ChessFacade);

  sessionCode = signal('');

  isGuestOrLogged = computed(() => {
    return this.chessFacade.guest();
  })

  isMenuLoading = computed(() => {
    const createGuestLoading = this.chessFacade.createGuestLoading();
    const disconnectGuestLoading = this.chessFacade.disconnectGuestLoading();
    const selectLoadInfosLoading = this.chessFacade.loadInfosLoading();
    return createGuestLoading || disconnectGuestLoading || selectLoadInfosLoading
  })

  haveGameSession = computed(() => {
    return this.chessFacade.gameSession();
  })

  onCodeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.sessionCode.set(input.value);
  }

  joinGameSession() {
    if (this.chessFacade.joinGameSessionLoading()) return;
    const code = this.cleanCode(this.sessionCode());
    if (!code) return;
    this.chessFacade.joinGameSession(code);
  }

  private cleanCode(input: string): string {
    if (!input) return '';
    const trimmed = input.trim();
    if (trimmed.includes('gamesession=')) {
      try {
        const url = trimmed.startsWith('http') ? new URL(trimmed) : new URL(trimmed, 'http://dummy.com');
        return url.searchParams.get('gamesession') || trimmed;
      } catch {
        const match = trimmed.match(/gamesession=([^&]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      }
    }
    return trimmed;
  }
}
