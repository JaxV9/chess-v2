import { inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class Queen {
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

                    //get the distance in row or in col
                    const isHorizontal = rowDiff === 0;
                    const distance = isHorizontal ? Math.abs(colDiff) : Math.abs(rowDiff);
                    const previewDistance = isHorizontal ? Math.abs(cD) : Math.abs(rD);

                    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

                    const sameDirection = isHorizontal ? Math.sign(cD) === Math.sign(colDiff) && rD === 0
                        : Math.sign(rD) === Math.sign(rowDiff) && cD === 0;

                    const sameDiagonal = Math.sign(rD) === Math.sign(rowDiff)
                        && Math.sign(cD) === Math.sign(colDiff);

                    const isBehind = piece.color === currentPiece.color ? previewDistance >= distance
                        : previewDistance > distance;

                    const isBlocked = isDiagonal ? (sameDiagonal && isBehind) : (sameDirection && isBehind);

                    return !isBlocked;
                })
            }
        })

        return previews;
    }
}
