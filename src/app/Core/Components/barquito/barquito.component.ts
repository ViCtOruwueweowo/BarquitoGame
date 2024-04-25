import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import { IniciarComponent } from '../iniciar/iniciar.component';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../Interface/users';
import { UsersService } from '../../Service/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Echo from 'laravel-echo';
import { HttpClient } from '@angular/common/http';
(window as any).Echo = Echo;
import { WebsocketService } from '../../Service/web-socket.service';

import Pusher from 'pusher-js';
(window as any).Pusher = Pusher;


@Component({
  selector: 'app-barquito',
  standalone: true,
  imports: [NgIf, NgFor, IniciarComponent, RouterLink,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './barquito.component.html',
  styleUrl: './barquito.component.css',
  animations: [
    trigger('moveImage', [
      state('start', style({ transform: 'translateX(-30vw)', opacity: 1 })),
      state('end', style({ transform: 'translateX(100vw)', opacity: 1 })),
      transition('* => *', animate('3500ms ease-in-out'))
    ])
  ],
})
export class BarquitoComponent implements OnInit{
  state = 'start';
  counter = 0;
  clickCounter = 0;
  missClickCounter = 0;
  clicksAllowed = 2;
  timer = 5;
  showWinnerModal = false;
  showModal = false;
  showLoserModal = false;
  echo: any;

  usersList:Users={
    name:'',
    wins:'',
    losses:'',
  };
  

  constructor(
    private usersService:UsersService,
    private ngZone: NgZone,  
    private router:Router,
    private http: HttpClient,
    private websocketService: WebsocketService,
  ){}

  ngOnInit():void{
    this.getusers();
    this.animateImage();

    this.websocketService.getMessages().subscribe((message: any) => {
      this.ngZone.run(() => {
        this.animateImage();
      });
    });

  
  }

  getusers(){
    this.usersService.getUsers().subscribe({
      next:(result)=>{
          this.usersList = result.data;
      }
  })
  
  }
  animateImage() {
    this.state = this.state === 'start' ? 'end' : 'start';
    this.counter++;

    if (this.counter < 10000) {
      setTimeout(() => {
        this.animateImage();
      }, 3500);
    }
  }
  onClick() {
    if (this.clicksAllowed > 0) {
      this.clickCounter++;
      this.clicksAllowed--;  
    }
  
    if (this.clicksAllowed === 0) {
      this.startTimer();
    }
  
    if (this.clickCounter === 6) {
      this.showWinnerModal = true;
      this.state = '';

      const token = localStorage.getItem('token');
      //const message = 'JALAME ESTA';
      // Enviar un mensaje al WebSocket
      this.echo.private('Home').whisper('message', {
        token: token
      }); 

      console.log(token)
      //console.log(message);

      this.echo.private('Home').listen('UserDetailEvent', (data: any) => {
        // Aquí recibes los datos del servidor a través de WebSocket
        // const user = data.user;
        console.log(data.user);

        // Ahora puedes hacer una solicitud HTTP a tu ruta con los datos del usuario
        //this.http.get('/show', { params: { user: data.user } }).subscribe(response => {
          //console.log(response);
        //});
      });

      this.echo.connected(() => {
        this.echo.private('home').listen('.UserDetailEvent', (data: any) => {
          console.log(data.user);
        });
      });
    }
  }

  onMissClick() {
    this.missClickCounter++;
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(interval);
        this.resetClicks();
        this.timer = 5;
      }
    }, 1000);
  }

  resetClicks() {
    this.clicksAllowed = 2;
  }
}