import { ChessPiece } from "../../models/models";
import { PieceRole } from "../../constants/constants";
import { computed, inject, Injectable } from "@angular/core";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class Pawn {

    chessFacade = inject(ChessFacade);

    canMoveThroughTwoSquares(chessPiece: ChessPiece) {
        const history = this.chessFacade.history();
        const pieceInHistory = history?.filter(h => h.piece_id === chessPiece.id);
        return pieceInHistory?.length === 0
    }

    getDiagonalCaptures(chessPiece: ChessPiece): number[] {
        const chessPieces = this.chessFacade.chessPieces();
        const index = chessPiece.pos;
        const captures: number[] = [];

        const diagLeft = chessPiece.color === "black" ? index + 7 : index - 9;
        const diagRight = chessPiece.color === "black" ? index + 9 : index - 7;

        const isOnColumnA = index % 8 === 1;
        const isOnColumnH = index % 8 === 0;

        if (!isOnColumnA) {
            const hasEnemyDiagLeft = chessPieces?.find(p => p.pos === diagLeft && p.color !== chessPiece.color);
            if (hasEnemyDiagLeft) captures.push(diagLeft);
        }

        if (!isOnColumnH) {
            const hasEnemyDiagRight = chessPieces?.find(p => p.pos === diagRight && p.color !== chessPiece.color);
            if (hasEnemyDiagRight) captures.push(diagRight);
        }

        return captures;
    }

    getEnPassant(chessPiece: ChessPiece): number[] {
        const history = this.chessFacade.history();
        const chessPieces = this.chessFacade.chessPieces();
        const index = chessPiece.pos;
        const captures: number[] = [];

        if (!history || history.length === 0) return captures;

        const lastMove = history[history.length - 1];
        const movedTwoSquares = Math.abs(lastMove.to - lastMove.from) === 16;
        if (!movedTwoSquares) return captures;

        // Check that the piece that just moved is an opponent pawn
        const movedPiece = chessPieces?.find(p => p.id === lastMove.piece_id);
        const isOpponentPawn = movedPiece &&
            movedPiece.color !== chessPiece.color &&
            movedPiece.role?.startsWith('pawn');
        if (!isOpponentPawn) return captures;

        // The target square is the one that was "passed through"
        const enPassantTarget = (lastMove.from + lastMove.to) / 2;

        const isAdjacentLeft = movedPiece.pos === index - 1 && index % 8 !== 1;
        const isAdjacentRight = movedPiece.pos === index + 1 && index % 8 !== 0;

        if (isAdjacentLeft || isAdjacentRight) {
            captures.push(enPassantTarget);
        }

        return captures;
    }

    public preview(chessPiece: ChessPiece): number[] {
        const chessPieces = this.chessFacade.chessPieces();
        const index = chessPiece.pos;
        let previews: number[] = []

        if (chessPiece.color === "black") {
            previews.push(index + 8);
            if (this.canMoveThroughTwoSquares(chessPiece)) {
                previews.push(index + 16)
            }
        } else {
            previews.push(index - 8);
            if (this.canMoveThroughTwoSquares(chessPiece)) {
                previews.push(index - 16)
            }
        }

        const piecesBlockingPath = chessPieces?.filter((piece) => {
            return previews.includes(piece.pos)
        });

        piecesBlockingPath?.map((piece) => {
            previews = previews.filter(index => index !== piece.pos)
        })

        previews.push(...this.getDiagonalCaptures(chessPiece));
        previews.push(...this.getEnPassant(chessPiece));

        return previews;
    }
}
