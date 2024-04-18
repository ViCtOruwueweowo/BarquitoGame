import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:6001'); // Cambia esto a la URL de tu servidor de Laravel Echo

    this.socket.on('connect', () => {
      this.socket.emit('subscribe', {
        channel: 'home', // nombre de canal
        auth: {} // Aquí puedes pasar cualquier dato de autenticación necesario
      });
    });
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('App\\Events\\NewMessage', (data:any) => {
        observer.next(data.message);
      });
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', { message });
  }
}