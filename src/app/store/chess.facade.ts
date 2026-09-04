import { Injectable, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChessPiece } from "../models/models"
import { ChessWebsocketService } from "../services/websocket.service";
import { ChessActions } from './chess.actions';
import { selectChessPieces, selectCreateGuestLoading, selectDisconnectGuestLoading, selectGameIsStarted, selectGetGameSession, selectGuest, selectLoadGuestLoading, selectLoadInfosLoading, selectPlayers, selectWaitingPlayer } from './chess.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class ChessFacade {
    private store = inject(Store);
    private websocketService = inject(ChessWebsocketService);

    chessPieces = toSignal(this.store.select(selectChessPieces));
    players = toSignal(this.store.select(selectPlayers));
    gameSession = toSignal(this.store.select(selectGetGameSession));
    guest = toSignal(this.store.select(selectGuest));
    createGuestLoading = toSignal(this.store.select(selectCreateGuestLoading));
    disconnectGuestLoading = toSignal(this.store.select(selectDisconnectGuestLoading));
    loadGuestLoading = toSignal(this.store.select(selectLoadGuestLoading));
    loadInfosLoading = toSignal(this.store.select(selectLoadInfosLoading));
    gameIsStarted = toSignal(this.store.select(selectGameIsStarted));
    waitingPlayer = toSignal(this.store.select(selectWaitingPlayer));

    opponent = computed(() => {
        const currentPlayer = this.guest()?.username;
        const players = this.players();
        if (!players) return
        return players.find((player) => player.username !== currentPlayer)?.username
    })

    pauseGame() {
        this.store.dispatch(ChessActions.pauseGame());
    }

    resumeGame() {
        this.store.dispatch(ChessActions.startGame());
    }

    wsConnection(gameSessionId: string) {
        this.store.dispatch(ChessActions.syncWsChessPieces({ gameSessionId }))
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

    makeAMove(chessPieces: ChessPiece[]) {
        this.store.dispatch(ChessActions.makeAMove({ chessPieces }))
    }
}
