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
    this.socket = io('http://192.168.115.16:8000'); // Cambia esto a la URL de tu servidor de Laravel Echo
    this.socket.on('connect', () => {
      this.socket.emit('subscribe', {
        channel: 'Home', // nombre de canal
        auth: {} // Aquí puedes pasar cualquier dato de autenticación necesario
      });

    // Escuchar eventos en el canal 'home'
    this.socket.on('App\\Events\\NewMessage', (message: any) => {
      this.messagesSubject.next(message);
      console.log("hola1")
    });
  });

    this.socket.on('error', (error: any) => {
      console.log('Error en la conexión del socket:', error);
      console.log("hola2")
    });
    
    this.socket.on('disconnect', () => {
      console.log('El socket se ha desconectado');
    });
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('App\\Events\\NewMessage', (data:any) => {
        console.log("hola3")
        observer.next(data.message);
      });
    });
  }

  sendMessage(message: string) {
    this.socket.emit('App\\Events\\NewMessage', { message });
    console.log("hola4")
  }
  
  get messages$() {
    return this.messagesSubject.asObservable();
  }
  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        console.log(`Evento recibido: ${eventName}`, data); // Agregar log para verificar el evento y los datos
        if (data) {
          subscriber.next(data);
        } else {
          subscriber.error(`No se recibieron datos del evento: ${eventName}`); // Manejo de errores si no hay datos
        }
      });
    });
  }
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}