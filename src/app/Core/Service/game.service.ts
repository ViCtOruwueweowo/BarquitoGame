import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../Interface/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient:HttpClient) { }

  public CrearPartida(game:Game, headers:HttpHeaders) {
    return this.httpClient.post(
      'http://127.0.0.1:8000/api/game',
      game,{headers}
    );
  }

  public EntrarPartida(game:Game, headers:HttpHeaders) {
    return this.httpClient.put(
      'http://127.0.0.1:8000/api/game',
      game,{headers}
    );
  }
}
