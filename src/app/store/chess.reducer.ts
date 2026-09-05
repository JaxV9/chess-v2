import { createReducer, on } from '@ngrx/store';
import { ChessPiece, Guest, LoadingStates } from '../models/models';
import { ChessActions } from './chess.actions';


export interface ChessState {
  pieces: ChessPiece[];
  game_session: string | undefined;
  guest: Guest | undefined;
  loadingStates: LoadingStates;
  gameIsStarted: boolean;
  displaySharedBanner: boolean;
  waitingPlayer: boolean;
  players: { username: string, color: "white" | "black" }[] | undefined
}

export const initialState: ChessState = {
  pieces: [],
  game_session: undefined,
  guest: undefined,
  loadingStates: {
    createGuestLoading: false,
    loadGuestLoading: false,
    disconnectGuestLoading: false,
    getInfosLoading: true,
  },
  gameIsStarted: false,
  displaySharedBanner: false,
  waitingPlayer: false,
  players: undefined
};


export const chessReducer = createReducer(
  initialState,
  on(ChessActions.setChessPieces, (state, { pieces }) => ({
    ...state,
    pieces
  })),
  on(ChessActions.setPlayersInGame, (state, { players }) => ({
    ...state,
    players
  })),
  on(ChessActions.setWaitingPlayer, (state, { waitingPlayer }) => ({
    ...state,
    waitingPlayer
  })),
  on(ChessActions.setGameSession, (state, { game_session }) => ({
    ...state,
    game_session
  })),
  on(ChessActions.setGuest, (state, { guest }) => ({
    ...state,
    guest
  })),
  on(ChessActions.loadInfos, (state) => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      getInfosLoading: true,
    }
  })),
  on(ChessActions.loadInfosError, (state) => ({
    ...state,
    loadingStates: {
      ...state.loadingStates,
      getInfosLoading: false,
    }
  })),
  on(ChessActions.setInfos, (state, { game_session }) => ({
    ...state,
    game_session,
    loadingStates: {
      ...state.loadingStates,
      getInfosLoading: false,
    }
  })),
  on(ChessActions.disconnectGuest, () => ({
    pieces: [],
    game_session: undefined,
    guest: undefined,
    loadingStates: {
      createGuestLoading: false,
      loadGuestLoading: false,
      disconnectGuestLoading: false,
      getInfosLoading: false,
    },
    gameIsStarted: false,
    displaySharedBanner: false,
    waitingPlayer: false,
    players: undefined
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
  on(ChessActions.startGame, (state) => ({
    ...state,
    gameIsStarted: true
  })),
  on(ChessActions.pauseGame, (state) => ({
    ...state,
    gameIsStarted: false
  })),
);
