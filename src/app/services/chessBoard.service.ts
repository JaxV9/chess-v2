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
}