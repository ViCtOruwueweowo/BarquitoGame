import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../Interface/game';
import { WebsocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient:HttpClient, private websocketService: WebsocketService) { }

  public CrearPartida(game:Game, headers:HttpHeaders) {
    return this.httpClient.post(
      //'http://192.168.100.128:8000/api/game',
      'http://192.168.115.16:8000/api/game',
      game,{headers}
    );
  }

  public EntrarPartida(game:Game, headers:HttpHeaders) {
    return this.httpClient.put(
      //'http://192.168.100.128:8000/api/game',
      'http://192.168.115.16:8000/api/game',
      game,{headers}
    );
  }
}
