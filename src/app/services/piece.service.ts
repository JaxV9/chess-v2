import { Injectable } from '@angular/core';
import pawnBlack from "../assets/pieces/pawn-black.svg";
import pawnWhite from "../assets/pieces/pawn-white.svg";
import bishopBlack from "../assets/pieces/bishop-black.svg"
import bishopWhite from "../assets/pieces/bishop-white.svg";
import kingBlack from "../assets/pieces/king-black.svg";
import kingWhite from "../assets/pieces/king-white.svg";
import queenBlack from "../assets/pieces/queen-black.svg";
import queenWhite from "../assets/pieces/queen-white.svg";
import knightBlack from "../assets/pieces/knight-black.svg";
import knightWhite from "../assets/pieces/knight-white.svg";
import rookBlack from "../assets/pieces/rook-black.svg";
import rookWhite from "../assets/pieces/rook-white.svg"
import { ChessPiece } from '../models/models';

@Injectable()
export class PieceService {
    roles: Record<string, string> = {
        "pawn_black": pawnBlack,
        "pawn_white": pawnWhite,
        "bishop_black": bishopBlack,
        "bishop_white": bishopWhite,
        "king_black": kingBlack,
        "king_white": kingWhite,
        "queen_black": queenBlack,
        "queen_white": queenWhite,
        "knight_black": knightBlack,
        "knight_white": knightWhite,
        "rook_black": rookBlack,
        "rook_white": rookWhite
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
