import { createReducer, on } from '@ngrx/store';
import { ChessPiece, Guest } from '../models/models';
import { ChessActions } from './chess.actions';


export interface ChessState {
  pieces: ChessPiece[];
  game_session: string | undefined;
  guest: Guest | undefined;
}

export const initialState: ChessState = {
  pieces: [],
  game_session: undefined,
  guest: undefined
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
  on(ChessActions.setGuest, (state, { guest }) => ({
    ...state,
    guest
  }))
);
