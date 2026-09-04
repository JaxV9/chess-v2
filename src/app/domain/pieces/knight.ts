import { Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";

@Injectable({
    providedIn: 'root'
})
export class Knight {
    constructor() { }

    private moves(index: number, chessPiece: ChessPiece) {
        const previews = []
        if (chessPiece.color === "black" || chessPiece.color === "white") {

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
        }
        return previews;
    }

    public checkMove(nextPos: number, chessPiece: ChessPiece) {
        const results = this.moves(chessPiece.pos, chessPiece)

        if (results.includes(nextPos)) {
            return true
        } else {
            return false
        }
    }

    public preview(index: number, chessPiece: ChessPiece): number[] {
        return this.moves(index, chessPiece)
    }
}
