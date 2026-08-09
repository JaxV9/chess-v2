import { Component, computed, inject, input } from '@angular/core';
import { SquareColorService } from '../../services/square-color.service';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
  providers: [SquareColorService]
})
export class SquareComponent {
  private squareColorService = inject(SquareColorService);

  currentIndex = input<number>();

  currentColor = computed(() => {
    const index = this.currentIndex();
    if (!index) return;

    return this.squareColorService.colorManager(index);
  })
}
