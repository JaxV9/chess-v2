import { Component, computed, inject, input } from '@angular/core';
import { SquareService } from '../../services/square.service';

@Component({
    selector: 'app-square',
    imports: [],
    templateUrl: './square.component.html',
    styleUrl: './square.component.css',
    providers: [SquareService]
})
export class SquareComponent {
  private squareService = inject(SquareService);

  currentIndex = input<number>();

  currentColor = computed(() => {
    const index = this.currentIndex();
    if (!index) return;

    return this.squareService.colorManager(index);
  })
}
