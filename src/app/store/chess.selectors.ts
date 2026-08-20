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