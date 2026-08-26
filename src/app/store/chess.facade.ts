import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChessPiece } from "../models/models"
import { ChessWebsocketService } from "../services/websocket.service";
import { ChessActions } from './chess.actions';
import { selectChessPieces, selectCreateGuestLoading, selectDisconnectGuestLoading, selectGetGameSession, selectGuest, selectLoadGuestLoading } from './chess.selectors';
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

    getChess() {
        this.store.dispatch(ChessActions.syncWsChessPieces());
    }

    updateChessPosition(chess: ChessPiece) {
        const formatData: { action: string, pieces: ChessPiece[] } = {
            action: "move",
            pieces: [chess]
        }
        this.websocketService.sendMessage(formatData);
    }
}
