import { Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";

@Injectable({
    providedIn: 'root'
})
export class Bishop {
    constructor() { }

    private moves(index: number) {
        const diagonals: number[] = [];
        for (let i = index + 7, j = 0; i <= 64 && i >= 0; i += 8, j--) {
            if ((i + j) % 8 === 0) {
                break
            }
            diagonals.push(i + j);
        }
        for (let i = index + 9, j = 0; i <= 64 && i >= 0; i += 8, j--) {
            if ((i - j) % 8 === 1) {
                break
            }
            diagonals.push(i - j);
        }
        for (let i = index - 9, j = 0; i <= 64 && i >= 0; i -= 8, j++) {
            if ((i - j) % 8 === 0) {
                break
            }
            diagonals.push(i - j);
        }
        for (let i = index - 7, j = 0; i <= 64 && i >= 0; i -= 8, j++) {
            if ((i + j) % 8 === 1) {
                break
            }
            diagonals.push(i + j);
        }

        return diagonals
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
