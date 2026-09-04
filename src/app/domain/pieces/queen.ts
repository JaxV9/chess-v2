import { Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";

@Injectable({
    providedIn: 'root'
})
export class Queen {
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

        const lines: number[] = [];
        for (let i = index + 8; i <= 64 && i >= 0; i += 8) {
            lines.push(i);
        }
        if (index > 8) {
            for (let i = index - 8; i <= 64 && i > 0; i -= 8) {
                lines.push(i);
            }
        }
        const left = index % 8 == 0 ? index - 8 : index - (index % 8)
        for (let i = index - 1; i <= index - 1 && i > left; i -= 1) {
            lines.push(i)
        }
        const right = index % 8 == 0 ? index : index + (8 - (index % 8))
        for (let i = index + 1; i >= index + 1 && i <= right; i += 1) {
            lines.push(i)
        }

        return [...diagonals, ...lines]
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
