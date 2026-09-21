import { computed, effect, inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class King {
    chessFacade = inject(ChessFacade);

    hasNotAlreadyMoved(chessPiece: ChessPiece) {
        const history = this.chessFacade.history();
        const pieceInHistory = history?.filter(h => h.piece_id === chessPiece.id);
        return pieceInHistory?.length === 0
    }

    rookBlackH8HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_b2") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_b2");
    })

    rookBlackA8HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_b1") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_b1");
    })

    rookWhiteA1HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_w1") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_w1");
    })

    rookWhiteH1HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_w2") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_w2");
    })

    test = effect(() => {
        console.log(this.chessFacade.chessPieces())
    })

    areSquaresEmpty(squares: number[]): boolean {
        const chessPieces = this.chessFacade.chessPieces();
        return !chessPieces?.some(piece => squares.includes(piece.pos));
    }

    preview(currentPiece: ChessPiece) {
        const chessPieces = this.chessFacade.chessPieces();
        const index = currentPiece.pos;
        let previews: number[] = [index + 8, index - 8, index + 1, index - 1, index - 7, index - 9, index + 7, index + 9];

        chessPieces?.map((chessPiece) => {
            if (chessPiece.color === currentPiece.color) {
                previews = previews.filter((preview) => preview !== chessPiece.pos);
            }
        })

        if (currentPiece.color === "black" && currentPiece.pos === 5 && this.hasNotAlreadyMoved(currentPiece)) {
            // Kingside castling
            if (this.rookBlackH8HasNotMove() && this.areSquaresEmpty([6, 7])) {
                previews.push(7);
            }
            // Queenside castling
            if (this.rookBlackA8HasNotMove() && this.areSquaresEmpty([2, 3, 4])) {
                previews.push(3);
            }
        }

        if (currentPiece.color === "white" && currentPiece.pos === 61 && this.hasNotAlreadyMoved(currentPiece)) {
            // Queenside castling
            if (this.rookWhiteA1HasNotMove() && this.areSquaresEmpty([58, 59, 60])) {
                previews.push(59);
            }
            // Kingside castling
            if (this.rookWhiteH1HasNotMove() && this.areSquaresEmpty([62, 63])) {
                previews.push(63);
            }
        }

        return previews;
    }

    getCastlingRookMove(from: number, to: number): { from: number, to: number } | null {
        const isCastling = Math.abs(to - from) === 2;
        if (!isCastling) return null;

        const moves: Record<number, { from: number, to: number }> = {
            63: { from: 64, to: 62 }, // White Kingside
            59: { from: 57, to: 60 }, // White Queenside
            7:  { from: 8,  to: 6 },  // Black Kingside
            3:  { from: 1,  to: 4 },  // Black Queenside
        };

        return moves[to] || null;
    }

    checkMove(nextPos: number, chessPiece: ChessPiece) {
        const results = this.preview(chessPiece)
        if (results.includes(nextPos)) {
            return true
        } else {
            return false
        }
    }
}
