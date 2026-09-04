import { inject, Injectable } from '@angular/core';
import { ChessPiece } from '../models/models';
import { King } from '../domain/pieces/king';
import { Queen } from '../domain/pieces/queen';
import { Knight } from '../domain/pieces/knight';
import { Bishop } from '../domain/pieces/bishop';
import { Pawn } from '../domain/pieces/pawn';
import { Rook } from '../domain/pieces/rook';

@Injectable()
export class PieceService {

    king = inject(King);
    queen = inject(Queen);
    knight = inject(Knight);
    bishop = inject(Bishop);
    rook = inject(Rook);
    pawn = inject(Pawn);

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

    getPieceImage(currentPiece: ChessPiece) {
        if (currentPiece.role === null) {
            return null
        }
        const imageSrc = this.roles[currentPiece.role];

        if (!imageSrc) {
            return null;
        }
        return imageSrc
    }

    getPreview(currentPiece: ChessPiece): number[] | null {
        const role = currentPiece.role;
        const pos = currentPiece.pos;
        switch (role) {
            case 'king_black':
            case 'king_white':
                return this.king.preview(pos);
            case 'queen_black':
            case 'queen_white':
                return this.queen.preview(pos);
            case 'bishop_black':
            case 'bishop_white':
                return this.bishop.preview(currentPiece);
            case 'knight_black':
            case 'knight_white':
                return this.knight.preview(pos, currentPiece);
            case 'rook_black':
            case 'rook_white':
                return this.rook.preview(pos);
            case 'pawn_black':
            case 'pawn_white':
                return this.pawn.preview(pos, currentPiece);
            default:
                return null
        }
    }
}
