import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  createGuest() {
    return this.http.post(`/api/guest`, {},
      { withCredentials: true }
    )
  }

  createGameSession() {
    return this.http.post<{ game_session: string }>(`/api/gamesession`, {},
      { withCredentials: true }
    )
  }
}
