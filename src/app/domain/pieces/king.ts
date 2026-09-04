import { Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";

@Injectable({
    providedIn: 'root'
})
export class King {
    constructor() { }

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

    public preview(index: number) {
        return this.moves(index)
    }
}
