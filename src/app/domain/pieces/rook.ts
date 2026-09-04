import { Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";

@Injectable({
    providedIn: 'root'
})
export class Rook {
    constructor() { }

    private moves(index: number): number[] {
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

        return lines
    }

    public checkMove(nextPos: number, chessPiece: ChessPiece) {

        const results = this.moves(chessPiece.pos)

        if (results.includes(nextPos)) {
            return true
        } else {
            return false
        }
    }

    public preview(index: number): number[] {
        return this.moves(index)
    }
}