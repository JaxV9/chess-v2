import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChessPiece } from "../models/models"
import { ChessWebsocketService } from "../services/websocket.service";
import { ChessActions } from './chess.actions';
import { selectChessPieces, selectCreateGuestLoading, selectDisconnectGuestLoading, selectGameIsStarted, selectGetGameSession, selectGuest, selectLoadGuestLoading, selectLoadInfosLoading } from './chess.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class ChessFacade {
    private store = inject(Store);
    private websocketService = inject(ChessWebsocketService);

    chessPieces = toSignal(this.store.select(selectChessPieces));
    gameSession = toSignal(this.store.select(selectGetGameSession));
    guest = toSignal(this.store.select(selectGuest));
    createGuestLoading = toSignal(this.store.select(selectCreateGuestLoading));
    disconnectGuestLoading = toSignal(this.store.select(selectDisconnectGuestLoading));
    loadGuestLoading = toSignal(this.store.select(selectLoadGuestLoading));
    loadInfosLoading = toSignal(this.store.select(selectLoadInfosLoading));
    gameIsStarted = toSignal(this.store.select(selectGameIsStarted));

    pauseGame() {
        this.store.dispatch(ChessActions.pauseGame());
    }

    resumeGame() {
        this.store.dispatch(ChessActions.startGame());
    }

    createGuest() {
        this.store.dispatch(ChessActions.createGuest());
    }

    loadGuest() {
        this.store.dispatch(ChessActions.loadGuest());
    }

    loadInfos() {
        this.store.dispatch(ChessActions.loadInfos());
    }

    disconnectGuest() {
        this.store.dispatch(ChessActions.disconnectGuest());
    }

    createGameSession() {
        this.store.dispatch(ChessActions.createGameSession());
    }

    joinGameSession(game_session: string) {
        this.store.dispatch(ChessActions.joinGameSession({ game_session }));
    }

    updateChessPosition(chess: ChessPiece) {
        const formatData: { action: string, pieces: ChessPiece[] } = {
            action: "move",
            pieces: [chess]
        }
        this.websocketService.sendMessage(formatData);
    }
}
