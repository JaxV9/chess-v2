import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChessState } from './chess.reducer';

export const selectChessState = createFeatureSelector<ChessState>('chess');

export const selectChessPieces = createSelector(
  selectChessState,
  (state) => state?.pieces ?? []
);

export const selectGetGameSession = createSelector(
  selectChessState,
  (state) => state?.game_session
)

export const selectGuest = createSelector(
  selectChessState,
  (state) => state?.guest
)

export const selectCreateGuestLoading = createSelector(
  selectChessState,
  (state) => state?.loadingStates.createGuestLoading
)

export const selectDisconnectGuestLoading = createSelector(
  selectChessState,
  (state) => state?.loadingStates.disconnectGuestLoading
)

export const selectLoadGuestLoading = createSelector(
  selectChessState,
  (state) => state?.loadingStates.loadGuestLoading
)