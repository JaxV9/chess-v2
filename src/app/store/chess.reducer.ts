import { createReducer, on } from '@ngrx/store';
import { ChessPiece } from '../models/models';
import { ChessActions } from './chess.actions';


export interface ChessState {
  pieces: ChessPiece[];
  game_session: string | undefined
}

export const initialState: ChessState = {
  pieces: [],
  game_session: undefined
};


export const chessReducer = createReducer(
  initialState,
  on(ChessActions.setChessPieces, (state, { pieces }) => ({
    ...state,
    pieces
  })),
  on(ChessActions.setGameSession, (state, { game_session }) => ({
    ...state,
    game_session
  })),
);
