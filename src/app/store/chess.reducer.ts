import { createReducer, on } from '@ngrx/store';
import { ChessPiece, Guest, LoadingStates } from '../models/models';
import { ChessActions } from './chess.actions';


export interface ChessState {
  pieces: ChessPiece[];
  game_session: string | undefined;
  guest: Guest | undefined;
  loadingStates: LoadingStates
}

export const initialState: ChessState = {
  pieces: [],
  game_session: undefined,
  guest: undefined,
  loadingStates: {
    createGuestLoading: false,
    loadGuestLoading: false,
    disconnectGuestLoading: false,
  }
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
  })),
  on(ChessActions.setInfos, (state, { game_session }) => ({
    ...state,
    game_session
  })),
  on(ChessActions.disconnectGuest, (state) => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      disconnectGuestLoading: true,
    }
  })),
  on(ChessActions.removeGuestFromStore, (state) => ({
    ...state,
    guest: undefined,
    loadingStates: {
      ...state.loadingStates,
      disconnectGuestLoading: false,
    }
  })),
  on(ChessActions.createGuest, (state) => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      createGuestLoading: true,
    }
  })),
  on(ChessActions.createGuestSuccess, ChessActions.createGuestFailure, (state) => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      createGuestLoading: false,
    }
  })),
);
