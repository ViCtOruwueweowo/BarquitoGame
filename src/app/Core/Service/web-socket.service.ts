import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket;
  private messagesSubject = new Subject<any>();

  constructor() {
    this.socket = io('http://192.168.100.128:6001'); // Cambia esto a la URL de tu servidor de Laravel Echo

    this.socket.on('connect', () => {
      this.socket.emit('subscribe', {
        channel: 'home', // nombre de canal
        auth: {} // Aquí puedes pasar cualquier dato de autenticación necesario
      });

    // Escuchar eventos en el canal 'home'
    this.socket.on('App\\Events\\NewMessage', (message: any) => {
      this.messagesSubject.next(message);
    });
  });

    this.socket.on('error', (error: any) => {
      console.log('Error en la conexión del socket:', error);
    });
    
    this.socket.on('disconnect', () => {
      console.log('El socket se ha desconectado');
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
    this.socket.emit('App\\Events\\NewMessage', { message });
  }
  
  get messages$() {
    return this.messagesSubject.asObservable();
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}