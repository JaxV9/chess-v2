import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  createGuest() {
    return this.http.post<{ id: string, username: string }>(`/api/guest`, {},
      { withCredentials: true }
    )
  }

  getGuest() {
    return this.http.get<{ id: string, username: string }>(`/api/guest`, {
      withCredentials: true,
    });
  }

  createGameSession() {
    return this.http.post<{ game_session: string }>(`/api/gamesession`, {},
      { withCredentials: true }
    )
  }
}
