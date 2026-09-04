import { inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class Knight {
    chessFacade = inject(ChessFacade);

    private moves(chessPiece: ChessPiece) {
        const chessPieces = this.chessFacade.chessPieces();
        const index = chessPiece.pos
        let previews: number[] = []

        if (index % 8 !== 1 && index % 8 !== 2) {
            previews.push(
                index - 2 - 8,
                index - 2 + 8,
            )
        }
        if (index % 8 !== 1) {
            previews.push(
                index + 16 - 1,
                index - 16 - 1,
            )
        }
        if (index % 8 !== 0 && index % 8 !== 7) {
            previews.push(
                index + 2 - 8,
                index + 2 + 8
            )
        }

        if (index % 8 !== 0) {
            previews.push(
                index + 16 + 1,
                index - 16 + 1
            )
        }

        chessPieces?.map((friendPiece) => {
            if (friendPiece.color === chessPiece.color && previews.includes(friendPiece.pos)) {
                previews = previews.filter((preview) => preview !== friendPiece.pos);
            }
        });

        return previews;
    }

    public preview(chessPiece: ChessPiece): number[] {
        return this.moves(chessPiece)
    }
}
