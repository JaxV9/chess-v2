import { Component, computed, inject, OnInit } from '@angular/core';
import { ChessFacade } from '../../store/chess.facade';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  chessFacade = inject(ChessFacade);

  guest = toSignal(this.chessFacade.guest$);

  isGuestOrLogged = computed(() => {
    return this.guest();
  })

  ngOnInit(): void {
    this.chessFacade.loadGuest();
  }
}
