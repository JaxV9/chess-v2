import { inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class King {
    chessFacade = inject(ChessFacade);

    preview(currentPiece: ChessPiece) {
        const chessPieces = this.chessFacade.chessPieces();
        const index = currentPiece.pos;
        let previews: number[] = [index + 8, index - 8, index + 1, index - 1, index - 7, index - 9, index + 7, index + 9];

        chessPieces?.map((chessPiece) => {
            if (chessPiece.color === currentPiece.color) {
                previews = previews.filter((preview) => preview !== chessPiece.pos);
            }
        })

        return previews;
    }

    checkMove(nextPos: number, chessPiece: ChessPiece) {
        const results = this.preview(chessPiece)
        if (results.includes(nextPos)) {
            return true
        } else {
            return false
        }
    }
}
