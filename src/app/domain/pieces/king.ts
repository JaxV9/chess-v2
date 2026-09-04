import { inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class King {
    chessFacade = inject(ChessFacade);

    private moves(index: number) {
        const moves: number[] = [index + 8, index - 8, index + 1, index - 1, index - 7, index - 9, index + 7, index + 9];

        return moves
    }

    public checkMove(nextPos: number, chessPiece: ChessPiece) {
        const results = this.moves(chessPiece.pos)
        if (results.includes(nextPos)) {
            return true
        } else {
            return false
        }
    }

    public preview(currentPiece: ChessPiece) {
        const chessPieces = this.chessFacade.chessPieces();
        let previews: number[] = this.moves(currentPiece.pos)

        chessPieces?.map((chessPiece) => {
            if (chessPiece.color === currentPiece.color) {
                previews = previews.filter((preview) => preview !== chessPiece.pos);
            }
        })

        return previews;
    }
}
