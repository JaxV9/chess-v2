import { Component, computed, inject } from '@angular/core';
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
}
