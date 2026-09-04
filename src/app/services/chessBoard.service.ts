import { Injectable, signal } from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class ChessBoardService {
    squaresInPreview = signal<number[]>([]);
}