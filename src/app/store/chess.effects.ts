import { Injectable, inject } from "@angular/core";
import { ChessActions } from "./chess.actions";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChessWebsocketService } from "../services/websocket.service";
import { HttpService } from "../services/http.service";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of, EMPTY } from "rxjs";
import { ChessPiece } from "../models/models";

@Injectable()
export class ChessEffects {
    private actions$ = inject(Actions);
    private websocketService = inject(ChessWebsocketService);
    private httpService = inject(HttpService);

    wsConnection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.syncWsChessPieces),
            switchMap(() => {
                const wsUrl = `${this.websocketService.baseUrl}/ws/chess`;
                return this.websocketService.connect(wsUrl).pipe(
                    map((response) => ChessActions.setChessPieces({ pieces: response.data as ChessPiece[] })),
                    catchError((error) => {
                        console.error('WebSocket connection error:', error);
                        return of({ type: '[Chess] WS Connection Error' });
                    })
                );
            })
        );
    });

    createGameSession = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.createGameSession),
            switchMap(() => {
                return this.httpService.createGameSession().pipe(
                    map(response => ChessActions.setGameSession({ game_session: response.game_session })),
                    catchError((error) => {
                        console.error('Create game session error')
                        return of({ type: '[Chess] Create game session error' })
                    })
                )

            })
        )
    })

    createGuest = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ChessActions.createGuest),
                switchMap(() => {
                    return this.httpService.createGuest().pipe(
                        tap((response) => console.log(response)),
                        catchError((error) => {
                            console.error('Error while creating guest', error);
                            return EMPTY;
                        })
                    );
                })
            );
        },
        { dispatch: false }
    );
}