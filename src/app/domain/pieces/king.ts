import { computed, effect, inject, Injectable } from "@angular/core";
import { ChessPiece } from "../../models/models";
import { ChessFacade } from "../../store/chess.facade";

@Injectable({
    providedIn: 'root'
})
export class King {
    chessFacade = inject(ChessFacade);

    row(pos: number): number {
        return Math.floor((pos - 1) / 8);
    }

    col(pos: number): number {
        return (pos - 1) % 8;
    }

    posFromCoord(row: number, col: number): number {
        return row * 8 + col + 1;
    }

    isInsideBoard(row: number, col: number): boolean {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    hasNotAlreadyMoved(chessPiece: ChessPiece) {
        const history = this.chessFacade.history();
        const pieceInHistory = history?.filter(h => h.piece_id === chessPiece.id);
        return pieceInHistory?.length === 0;
    }

    rookBlackH8HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_b2") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_b2");
    });

    rookBlackA8HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_b1") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_b1");
    });

    rookWhiteA1HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_w1") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_w1");
    });

    rookWhiteH1HasNotMove = computed(() => {
        const history = this.chessFacade.history();
        return !history?.find(h => h.piece_id === "rook_w2") &&
            !!this.chessFacade.chessPieces()?.find(piece => piece.id === "rook_w2");
    });

    isWhiteInCheck = computed(() => this.isCheck('white'));
    isBlackInCheck = computed(() => this.isCheck('black'));
    isWhiteInCheckmate = computed(() => this.isCheckmate('white'));
    isBlackInCheckmate = computed(() => this.isCheckmate('black'));

    areSquaresEmpty(squares: number[], pieces?: ChessPiece[]): boolean {
        const chessPieces = pieces ?? this.chessFacade.chessPieces();
        return !chessPieces?.some(piece => squares.includes(piece.pos));
    }

    // determines whether a given square is attacked by any piece of attackerColor.
    isSquareAttacked(square: number, attackerColor: string, customPieces?: ChessPiece[]): boolean {
        const pieces = customPieces ?? this.chessFacade.chessPieces();
        if (!pieces || pieces.length === 0) return false;

        const targetRow = this.row(square);
        const targetCol = this.col(square);

        const pieceMap = new Map<number, ChessPiece>();
        for (const p of pieces) {
            pieceMap.set(p.pos, p);
        }

        // pawn attacks
        if (attackerColor === 'white') {
            const pawnRow = targetRow + 1;
            for (const pawnCol of [targetCol - 1, targetCol + 1]) {
                if (this.isInsideBoard(pawnRow, pawnCol)) {
                    const p = pieceMap.get(this.posFromCoord(pawnRow, pawnCol));
                    if (p && p.color === 'white' && (p.role === 'pawn_white' || p.role?.startsWith('pawn') || p.id?.startsWith('pawn'))) {
                        return true;
                    }
                }
            }
        } else {
            const pawnRow = targetRow - 1;
            for (const pawnCol of [targetCol - 1, targetCol + 1]) {
                if (this.isInsideBoard(pawnRow, pawnCol)) {
                    const p = pieceMap.get(this.posFromCoord(pawnRow, pawnCol));
                    if (p && p.color === 'black' && (p.role === 'pawn_black' || p.role?.startsWith('pawn') || p.id?.startsWith('pawn'))) {
                        return true;
                    }
                }
            }
        }

        // knight attacks
        const knightOffsets = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        for (const [dr, dc] of knightOffsets) {
            const nr = targetRow + dr;
            const nc = targetCol + dc;
            if (this.isInsideBoard(nr, nc)) {
                const p = pieceMap.get(this.posFromCoord(nr, nc));
                if (p && p.color === attackerColor && (p.role?.includes('knight') || p.id?.startsWith('knight'))) {
                    return true;
                }
            }
        }

        // straights (Rook & Queen)
        const straightDirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of straightDirs) {
            let nr = targetRow + dr;
            let nc = targetCol + dc;
            while (this.isInsideBoard(nr, nc)) {
                const p = pieceMap.get(this.posFromCoord(nr, nc));
                if (p) {
                    if (p.color === attackerColor && (p.role?.includes('rook') || p.role?.includes('queen') || p.id?.startsWith('rook') || p.id?.startsWith('queen'))) {
                        return true;
                    }
                    break;
                }
                nr += dr;
                nc += dc;
            }
        }

        // diagonals (Bishop & Queen)
        const diagDirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        for (const [dr, dc] of diagDirs) {
            let nr = targetRow + dr;
            let nc = targetCol + dc;
            while (this.isInsideBoard(nr, nc)) {
                const p = pieceMap.get(this.posFromCoord(nr, nc));
                if (p) {
                    if (p.color === attackerColor && (p.role?.includes('bishop') || p.role?.includes('queen') || p.id?.startsWith('bishop') || p.id?.startsWith('queen'))) {
                        return true;
                    }
                    break;
                }
                nr += dr;
                nc += dc;
            }
        }

        // king adjacent attacks
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const kr = targetRow + dr;
                const kc = targetCol + dc;
                if (this.isInsideBoard(kr, kc)) {
                    const p = pieceMap.get(this.posFromCoord(kr, kc));
                    if (p && p.color === attackerColor && (p.role?.includes('king') || p.id?.startsWith('king'))) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    //checks if the king of a specific color is currently in check.
    isCheck(color: string, customPieces?: ChessPiece[]): boolean {
        const pieces = customPieces ?? this.chessFacade.chessPieces();
        if (!pieces || pieces.length === 0) return false;

        const king = pieces.find(p => p.color === color && (p.role === `king_${color}` || p.role?.startsWith('king') || p.id?.startsWith('king')));
        if (!king) return false;

        const opponentColor = color === 'white' ? 'black' : 'white';
        return this.isSquareAttacked(king.pos, opponentColor, pieces);
    }

    //generates all raw candidate moves for a piece (used for simulating moves).
    private generatePieceMoves(piece: ChessPiece, pieceMap: Map<number, ChessPiece>, history?: any): number[] {
        const moves: number[] = [];
        const r = this.row(piece.pos);
        const c = this.col(piece.pos);

        if (piece.role?.includes('pawn')) {
            const dir = piece.color === 'white' ? -1 : 1;
            const startRow = piece.color === 'white' ? 6 : 1;

            // forward 1
            const fwdR = r + dir;
            if (this.isInsideBoard(fwdR, c)) {
                const fwdPos = this.posFromCoord(fwdR, c);
                if (!pieceMap.has(fwdPos)) {
                    moves.push(fwdPos);
                    // forward 2
                    if (r === startRow) {
                        const fwd2R = r + 2 * dir;
                        const fwd2Pos = this.posFromCoord(fwd2R, c);
                        if (!pieceMap.has(fwd2Pos)) {
                            moves.push(fwd2Pos);
                        }
                    }
                }
            }

            // diagonal captures
            for (const dc of [-1, 1]) {
                const capR = r + dir;
                const capC = c + dc;
                if (this.isInsideBoard(capR, capC)) {
                    const capPos = this.posFromCoord(capR, capC);
                    const target = pieceMap.get(capPos);
                    if (target && target.color !== piece.color) {
                        moves.push(capPos);
                    }
                }
            }

            // en passant
            if (history && history.length > 0) {
                const lastMove = history[history.length - 1];
                const movedPiece = pieceMap.get(lastMove?.to);
                if (movedPiece && movedPiece.color !== piece.color && movedPiece.role?.startsWith('pawn') && Math.abs(lastMove.to - lastMove.from) === 16) {
                    const enPassantTarget = (lastMove.from + lastMove.to) / 2;
                    if ((movedPiece.pos === piece.pos - 1 && piece.pos % 8 !== 1) || (movedPiece.pos === piece.pos + 1 && piece.pos % 8 !== 0)) {
                        moves.push(enPassantTarget);
                    }
                }
            }
        } else if (piece.role?.includes('knight')) {
            const knightOffsets = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            for (const [dr, dc] of knightOffsets) {
                const nr = r + dr;
                const nc = c + dc;
                if (this.isInsideBoard(nr, nc)) {
                    const targetPos = this.posFromCoord(nr, nc);
                    const target = pieceMap.get(targetPos);
                    if (!target || target.color !== piece.color) {
                        moves.push(targetPos);
                    }
                }
            }
        } else if (piece.role?.includes('bishop') || piece.role?.includes('rook') || piece.role?.includes('queen')) {
            const dirs: number[][] = [];
            if (piece.role?.includes('bishop') || piece.role?.includes('queen')) {
                dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
            }
            if (piece.role?.includes('rook') || piece.role?.includes('queen')) {
                dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
            }

            for (const [dr, dc] of dirs) {
                let nr = r + dr;
                let nc = c + dc;
                while (this.isInsideBoard(nr, nc)) {
                    const targetPos = this.posFromCoord(nr, nc);
                    const target = pieceMap.get(targetPos);
                    if (!target) {
                        moves.push(targetPos);
                    } else {
                        if (target.color !== piece.color) {
                            moves.push(targetPos);
                        }
                        break;
                    }
                    nr += dr;
                    nc += dc;
                }
            }
        } else if (piece.role?.includes('king')) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (this.isInsideBoard(nr, nc)) {
                        const targetPos = this.posFromCoord(nr, nc);
                        const target = pieceMap.get(targetPos);
                        if (!target || target.color !== piece.color) {
                            moves.push(targetPos);
                        }
                    }
                }
            }
        }

        return moves;
    }

    // checks if the player of color has at least one legal move available.
    hasLegalMoves(color: string, customPieces?: ChessPiece[]): boolean {
        const pieces = customPieces ?? this.chessFacade.chessPieces();
        if (!pieces || pieces.length === 0) return false;

        const history = this.chessFacade.history();
        const myPieces = pieces.filter(p => p.color === color);
        const pieceMap = new Map<number, ChessPiece>();
        for (const p of pieces) {
            pieceMap.set(p.pos, p);
        }

        for (const piece of myPieces) {
            const rawMoves = this.generatePieceMoves(piece, pieceMap, history);
            for (const targetPos of rawMoves) {
                // simulate move
                let simulatedPieces = pieces.filter(p => p.id !== piece.id && p.pos !== targetPos);

                // handle en passant capture in simulation
                if (piece.role?.startsWith('pawn') && Math.abs(targetPos - piece.pos) !== 8 && Math.abs(targetPos - piece.pos) !== 16 && !pieceMap.has(targetPos)) {
                    const capturedPawnPos = piece.color === 'white' ? targetPos + 8 : targetPos - 8;
                    simulatedPieces = simulatedPieces.filter(p => p.pos !== capturedPawnPos);
                }

                simulatedPieces.push({ ...piece, pos: targetPos });

                if (!this.isCheck(color, simulatedPieces)) {
                    return true;
                }
            }
        }

        return false;
    }

    //checks if the player of color is currently in checkmate.
    isCheckmate(color: string, customPieces?: ChessPiece[]): boolean {
        const pieces = customPieces ?? this.chessFacade.chessPieces();
        if (!pieces || pieces.length === 0) return false;

        if (!this.isCheck(color, pieces)) {
            return false;
        }

        return !this.hasLegalMoves(color, pieces);
    }

    //checks if the player of color is in stalemate.
    isStalemate(color: string, customPieces?: ChessPiece[]): boolean {
        const pieces = customPieces ?? this.chessFacade.chessPieces();
        if (!pieces || pieces.length === 0) return false;

        if (this.isCheck(color, pieces)) {
            return false;
        }

        return !this.hasLegalMoves(color, pieces);
    }

    preview(currentPiece: ChessPiece) {
        const chessPieces = this.chessFacade.chessPieces();
        const opponentColor = currentPiece.color === 'white' ? 'black' : 'white';
        const r = this.row(currentPiece.pos);
        const c = this.col(currentPiece.pos);
        let previews: number[] = [];

        // adjacent king moves
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr;
                const nc = c + dc;
                if (this.isInsideBoard(nr, nc)) {
                    const targetPos = this.posFromCoord(nr, nc);
                    const occupant = chessPieces?.find(p => p.pos === targetPos);
                    if (!occupant || occupant.color !== currentPiece.color) {
                        // simulate move to ensure King does not move into check
                        const simPieces = (chessPieces ?? [])
                            .filter(p => p.id !== currentPiece.id && p.pos !== targetPos)
                            .concat([{ ...currentPiece, pos: targetPos }]);

                        if (!this.isCheck(currentPiece.color, simPieces)) {
                            previews.push(targetPos);
                        }
                    }
                }
            }
        }

        // castling (cannot castle while in check or through attacked squares)
        const inCheck = this.isCheck(currentPiece.color);

        if (!inCheck) {
            if (currentPiece.color === "black" && currentPiece.pos === 5 && this.hasNotAlreadyMoved(currentPiece)) {
                // kingside castling
                if (this.rookBlackH8HasNotMove() && this.areSquaresEmpty([6, 7]) &&
                    !this.isSquareAttacked(6, 'white') && !this.isSquareAttacked(7, 'white')) {
                    previews.push(7);
                }
                // queenside castling
                if (this.rookBlackA8HasNotMove() && this.areSquaresEmpty([2, 3, 4]) &&
                    !this.isSquareAttacked(4, 'white') && !this.isSquareAttacked(3, 'white')) {
                    previews.push(3);
                }
            }

            if (currentPiece.color === "white" && currentPiece.pos === 61 && this.hasNotAlreadyMoved(currentPiece)) {
                // queenside castling
                if (this.rookWhiteA1HasNotMove() && this.areSquaresEmpty([58, 59, 60]) &&
                    !this.isSquareAttacked(60, 'black') && !this.isSquareAttacked(59, 'black')) {
                    previews.push(59);
                }
                // kingside castling
                if (this.rookWhiteH1HasNotMove() && this.areSquaresEmpty([62, 63]) &&
                    !this.isSquareAttacked(62, 'black') && !this.isSquareAttacked(63, 'black')) {
                    previews.push(63);
                }
            }
        }

        return previews;
    }

    getCastlingRookMove(from: number, to: number): { from: number, to: number } | null {
        const isCastling = Math.abs(to - from) === 2;
        if (!isCastling) return null;

        const moves: Record<number, { from: number, to: number }> = {
            63: { from: 64, to: 62 }, // white kingside
            59: { from: 57, to: 60 }, // white queenside
            7: { from: 8, to: 6 },  // black kingside
            3: { from: 1, to: 4 },  // black queenside
        };

        return moves[to] || null;
    }

    // filters candidate moves to only keep those that do not leave the king in check
    filterLegalMoves(currentPiece: ChessPiece, candidateMoves: number[], customPieces?: ChessPiece[]): number[] {
        const pieces = customPieces ?? this.chessFacade.chessPieces() ?? [];
        return candidateMoves.filter((targetPos) => {
            let simPieces = pieces.filter(p => p.id !== currentPiece.id && p.pos !== targetPos);

            // en passant
            if (currentPiece.role?.startsWith('pawn') && Math.abs(targetPos - currentPiece.pos) !== 8 && Math.abs(targetPos - currentPiece.pos) !== 16 && !pieces.some(p => p.pos === targetPos)) {
                const capturedPawnPos = currentPiece.color === 'white' ? targetPos + 8 : targetPos - 8;
                simPieces = simPieces.filter(p => p.pos !== capturedPawnPos);
            }

            // castling
            const isKing = currentPiece.role?.startsWith('king');
            const rookMove = isKing ? this.getCastlingRookMove(currentPiece.pos, targetPos) : null;
            if (rookMove) {
                simPieces = simPieces.map(p => p.pos === rookMove.from ? { ...p, pos: rookMove.to } : p);
            }

            simPieces.push({ ...currentPiece, pos: targetPos });

            return !this.isCheck(currentPiece.color, simPieces);
        });
    }

    checkMove(nextPos: number, chessPiece: ChessPiece) {
        const results = this.preview(chessPiece);
        return results.includes(nextPos);
    }
}


