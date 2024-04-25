import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private echo: Echo;
  private messagesSubject = new Subject<any>();

  constructor() {
    window.Pusher = require('pusher-js');

    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'fd602615a6aa889ee1b3', // Reemplaza esto con tu clave de Pusher
      wsHost: '192.168.100.128',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });

    this.echo.private('home')
      .listen('NewMessage', (message: any) => {
        this.messagesSubject.next(message);
      });
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }
}