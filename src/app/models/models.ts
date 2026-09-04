export type ChessPiece = {
    id: string;
    role: 'pawn_black' | 'pawn_white' | 'bishop_black' | 'bishop_white' | 'king_black' |
    'king_white' | 'queen_black' | 'queen_white' | 'knight_black' | 'knight_white' | 'rook_black' | 'rook_white',
    color: string,
    pos: number;
};

export type Player = {
    id: string
    name: string;
    team: "white" | 'black',
    ChessPiecesCaptured: ChessPiece[] | null,
}

export type Guest = {
    id: string,
    username: string
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

export interface LoadingStates {
    createGuestLoading: boolean,
    loadGuestLoading: boolean,
    disconnectGuestLoading: boolean,
    getInfosLoading: boolean,
}

export interface WebSocketResponse {
    data: ChessPiece[],
    players: {
        username: string
        color: "white" | "black"
    }[],
    waiting_player: boolean,
}