import { Injectable } from '@angular/core';
import { ChessPiece } from '../models/models';

@Injectable()
export class PieceService {
    roles: Record<string, string> = {
        "pawn_black": "pieces/pawn-black.svg",
        "pawn_white": "pieces/pawn-white.svg",
        "bishop_black": "pieces/bishop-black.svg",
        "bishop_white": "pieces/bishop-white.svg",
        "king_black": "pieces/king-black.svg",
        "king_white": "pieces/king-white.svg",
        "queen_black": "pieces/queen-black.svg",
        "queen_white": "pieces/queen-white.svg",
        "knight_black": "pieces/knight-black.svg",
        "knight_white": "pieces/knight-white.svg",
        "rook_black": "pieces/rook-black.svg",
        "rook_white": "pieces/rook-white.svg"
    }

    getCurrentRole(currentPiece: ChessPiece) {
        if (currentPiece.role === null) {
            return null
        }
        const imageSrc = this.roles[currentPiece.role];

        if (!imageSrc) {
            return null;
        }
        return imageSrc
    }
}
