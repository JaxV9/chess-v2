import { inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class Bishop {
    chessFacade = inject(ChessFacade);

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

    // 0 to 7
    row(pos: number) {
        return Math.floor((pos - 1) / 8);
    }

    // 0 to 7
    col(pos: number) {
        return (pos - 1) % 8;
    }


    public preview(currentPiece: ChessPiece) {
        const allPieces = this.chessFacade.chessPieces();
        let previews = this.moves(currentPiece.pos);

        allPieces?.map((piece) => {
            if (previews.includes(piece.pos)) {

                const rowDiff = this.row(piece.pos) - this.row(currentPiece.pos);
                const colDiff = this.col(piece.pos) - this.col(currentPiece.pos);

                previews = previews.filter((preview) => {
                    //position of the collision with an other piece
                    const rD = this.row(preview) - this.row(currentPiece.pos);
                    const cD = this.col(preview) - this.col(currentPiece.pos);

                    const sameDiagonal = Math.sign(rD) === Math.sign(rowDiff)
                        && Math.sign(cD) === Math.sign(colDiff);

                    //determine if a square is behind a piece
                    const isBehind = piece.color === currentPiece.color ?
                        Math.abs(rD) >= Math.abs(rowDiff) : Math.abs(rD) > Math.abs(rowDiff);

                    return !(sameDiagonal && isBehind);
                })
            }
        });
        return previews;
    }
}
