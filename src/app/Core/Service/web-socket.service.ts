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
<<<<<<< HEAD
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
=======
    this.socket = io('http://192.168.255.70:6001'); // Cambia esto a la URL de tu servidor de Laravel Echo
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', {
        channel: 'home', // nombre de canal
        auth: {} // Aquí puedes pasar cualquier dato de autenticación necesario
>>>>>>> 3513bea8a82b6f363b53eb6ef1e6e4f990261133
      });
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }
}