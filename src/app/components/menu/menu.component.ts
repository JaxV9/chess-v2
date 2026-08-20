import { Component, computed, inject, OnInit } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-menu',
  imports: [MatProgressSpinnerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  chessFacade = inject(ChessFacade);

  isGuestOrLogged = computed(() => {
    return this.chessFacade.guest();
  })

  isMenuLoading = computed(() => {
    const createGuestLoading = this.chessFacade.createGuestLoading();
    const disconnectGuestLoading = this.chessFacade.disconnectGuestLoading();
    return createGuestLoading || disconnectGuestLoading
  })

  ngOnInit(): void {
    this.chessFacade.loadGuest();
  }
}
