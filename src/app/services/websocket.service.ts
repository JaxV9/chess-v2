import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/models';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ChessWebsocketService {
    private socket$: WebSocketSubject<ApiResponse> | null = null;
    baseUrl = environment.wsBaseUrl;

    connect(url: string): Observable<ApiResponse> {

        if (!this.socket$) {
            this.socket$ = webSocket(url);
        }
        return this.socket$.asObservable();
    }

    sendMessage(message: any) {
        this.socket$?.next(message);
    }
}
