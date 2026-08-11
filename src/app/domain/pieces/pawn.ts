import { ChessPiece } from "../../models/models";
import { PieceRole } from "../../constants/constants";

export class PawnDomain {
    constructor() { }


    public checkMove(nextPos: number, chessPiece: ChessPiece) {
        if (nextPos === chessPiece.pos + 8 && chessPiece.role === PieceRole.pawn_black) {
            return true
        } else if (nextPos === chessPiece.pos - 8 && chessPiece.role === PieceRole.pawn_white) {
            return true
        } else {
            return false
        }
    }

    public preview(index: number, chessPiece: ChessPiece) {
        if (chessPiece.color === "black") {
            return [index + 8];
        } else if (chessPiece.color === "white") {
            return [index - 8];
        } else {
            return null
        }

    }
}
