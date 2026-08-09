export type ChessPiece = {
    id: string;
    role: string,
    color: string,
    pos: number;
};

export type Player = {
    id: string
    name: string;
    team: "white" | 'black',
    ChessPiecesCaptured: ChessPiece[] | null,
}

export type Move = {
    chessPieceId: string,
    player: Player,
    from: number,
    to: number,
    pieceCaptured: ChessPiece | null
}

export type Game = {
    id: string,
    mode: 'solo' | 'multi',
    player1: Player,
    player2: Player,
    winner: Player | 'null' | null
}

export type GameLogs = {
    game: Game | null,
    moves: Move[] | [],
}

export interface ApiResponse {
    response: string,
    data: unknown
}