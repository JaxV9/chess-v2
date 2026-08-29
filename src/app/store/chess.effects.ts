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
            switchMap((action: { gameSessionId: string }) => {
                const wsUrl = `${this.websocketService.baseUrl}/ws/chess/${action.gameSessionId}`;
                return this.websocketService.connect(wsUrl).pipe(
                    switchMap((response) => of(
                        ChessActions.setChessPieces({ pieces: response.data as ChessPiece[] }),
                        ChessActions.syncWsChessPiecesSuccess()
                    )),
                    catchError((error) => {
                        console.error('WebSocket connection error:', error);
                        return of(ChessActions.syncWsChessPiecesError());
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
                    switchMap((response) => of(
                        ChessActions.setGameSession({ game_session: response.game_session }),
                        ChessActions.startGame(),
                        ChessActions.syncWsChessPieces({ gameSessionId: response.game_session })
                    )),
                    catchError((error) => {
                        console.error('Create game session error', error);
                        return of(ChessActions.createGameSessionFailure());
                    })
                )

            })
        )
    })

    joinGameSession = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.joinGameSession),
            switchMap((action) =>
                this.httpService.joinGameSession(action.game_session).pipe(
                    switchMap((response) => of(
                        ChessActions.joinGameSessionSuccess(),
                        ChessActions.startGame(),
                        ChessActions.setGameSession({ game_session: response.game_session }),
                        ChessActions.syncWsChessPieces({ gameSessionId: response.game_session })
                    )),
                    catchError(() => of(ChessActions.joinGameSessionFailure()))
                )
            )
        )
    })

    createGuest = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(ChessActions.createGuest),
                switchMap(() => {
                    return this.httpService.createGuest().pipe(
                        switchMap((response) => of(
                            ChessActions.setGuest({ guest: response }),
                            ChessActions.createGuestSuccess(),
                        )),
                        catchError(() => {
                            return of(ChessActions.createGuestFailure());
                        })
                    );
                })
            );
        }
    );

    loadGuest = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.loadGuest),
            switchMap(() => {
                return this.httpService.getGuest().pipe(
                    map((response) => ChessActions.setGuest({ guest: response })),
                    catchError((error) => {
                        return EMPTY;
                    })
                )
            })
        )
    })

    loadInfos = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.loadInfos),
            switchMap(() => {
                return this.httpService.getInfos().pipe(
                    map((response) => ChessActions.setInfos({ game_session: response.game_session })),
                    catchError(() => of(ChessActions.loadInfosError()))
                )
            })
        )
    })

    disconnectGuest = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChessActions.disconnectGuest),
            switchMap(() => {
                return this.httpService.disconnectGuest().pipe(
                    map(() => ChessActions.removeGuestFromStore()),
                    catchError((error) => {
                        console.error('Error while creating guest', error);
                        return EMPTY;
                    })
                )
            })
        )
    })
}