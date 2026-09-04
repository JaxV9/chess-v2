import { ChessPiece } from "../../models/models";
import { PieceRole } from "../../constants/constants";
import { inject, Injectable } from "@angular/core";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class Pawn {

    chessFacade = inject(ChessFacade);

    public preview(chessPiece: ChessPiece): number[] {
        const chessPieces = this.chessFacade.chessPieces();
        const index = chessPiece.pos;
        let previews: number[] = []

        if (chessPiece.color === "black") {
            previews.push(index + 8);
        } else {
            previews.push(index - 8);
        }

        const hasFriendPieceInPreview = chessPieces?.find((friendPiece) => {
            return friendPiece.color === chessPiece.color && previews.includes(friendPiece.pos)
        });
        if (hasFriendPieceInPreview) return []

        return previews;
    }
}
