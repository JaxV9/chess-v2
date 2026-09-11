import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = environment.httpBaseUrl;

  createGuest() {
    return this.http.post<{ id: string, username: string }>(`${this.baseUrl}/guest`, {},
      { withCredentials: true }
    );
  }

  getGuest() {
    return this.http.get<{ id: string, username: string }>(`${this.baseUrl}/guest`, {
      withCredentials: true,
    });
  }

  disconnectGuest() {
    return this.http.post(`${this.baseUrl}/guest/disconnect`, {},
      { withCredentials: true }
    );
  }

  getInfos() {
    return this.http.get<{ game_session: string }>(`${this.baseUrl}/infos`, {
      withCredentials: true
    });
  }

  createGameSession() {
    return this.http.post<{ game_session: string }>(`${this.baseUrl}/gamesession`, {},
      { withCredentials: true }
    );
  }

  joinGameSession(gameSessionId: string) {
    return this.http.post<{ game_session: string }>(`${this.baseUrl}/gamesession/join/${gameSessionId}`, {},
      { withCredentials: true }
    );
  }
}
