import { Injectable, signal } from "@angular/core";
import { ChessPiece } from "../models/models";


@Injectable({
    providedIn: 'root',
})
export class ChessBoardService {
    squaresInPreview = signal<number[]>([]);
    pieceIsPreviewed = signal<ChessPiece | undefined>(undefined);

    resetPreview() {
        this.squaresInPreview.set([]);
        this.pieceIsPreviewed.set(undefined);
    }

    getSquareNotation(square: number): string {
        if (square < 1 || square > 64) return '';
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const file = files[(square - 1) % 8];
        const rank = 8 - Math.floor((square - 1) / 8);
        return `${file}${rank}`;
    }
}