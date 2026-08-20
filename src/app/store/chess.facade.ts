import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChessPiece } from "../models/models"
import { ChessWebsocketService } from "../services/websocket.service";
import { ChessActions } from './chess.actions';
import { selectChessPieces, selectGetGameSession, selectGuest } from './chess.selectors';

@Injectable({
    providedIn: 'root'
})
export class ChessFacade {
    private store = inject(Store);
    private websocketService = inject(ChessWebsocketService);

    chessPieces$ = this.store.select(selectChessPieces);
    gameSession$ = this.store.select(selectGetGameSession);
    guest$ = this.store.select(selectGuest);

    createGuest() {
        this.store.dispatch(ChessActions.createGuest());
    }

    loadGuest() {
        this.store.dispatch(ChessActions.loadGuest());
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
