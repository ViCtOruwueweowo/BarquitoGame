import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, NgZone, HostListener } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
(window as any).Pusher = Pusher;


@Component({
  selector: 'app-barquito',
  standalone: true,
  imports: [NgIf, NgFor, IniciarComponent, RouterLink,CommonModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './barquito.component.html',
  styleUrl: './barquito.component.css',
  animations: [
    trigger('moveImage', [
      state('start', style({ transform: 'translateX(-20vw)', opacity: 1 })),
      state('end', style({ transform: 'translateX(100vw)', opacity: 1 })),
      transition('* => *', animate('3500ms ease-in-out'))
    ])
  ],
})
export class BarquitoComponent implements OnInit{
  audio=new Audio();
  movenumPosition='start';
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
    private webSocketService:WebsocketService,
    private http: HttpClient,
    private websocketService: WebsocketService,
  ){}

  ngOnInit():void{
    this.animateImage();
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'fd602615a6aa889ee1b3', 
      cluster: 'mt1', 
      wsHost: '192.168.115.16', 
      wsPort: 6001, 
      forceTLS: false,
      disableStats: true,
    });

    // Escucha el evento 'NewMessage' en el canal 'home'
    this.echo.channel('Home').listen('.NewMessage', (data:any) => {
      console.log('Evento recibido');
      console.log(data);
    });

    this.echo.channel('Home') 
      .listen('message', (data: any) => { 
        this.ngZone.run(() => {  
          this.animateImage();
        });
      });
  }


  animateImage() {
    this.state = this.state === 'start' ? 'end' : 'start';
    console.log("EL BARCO DIO LA VUELTA")
    this.movenumPosition = this.state;
    this.counter++;
    // let animationSpeed = 2500 - (this.clickCounter * 100);  Es para reducir el tiempo de la animacion, si le metes otro cero la animacion pierde su alineacion con la trancision
    let animationSpeed = 2500 - (this.clickCounter * 100); 
    animationSpeed = Math.max(animationSpeed, 0); 
    if (this.counter < 10000) {
      setTimeout(() => {
        this.animateImage();
      }, animationSpeed);
    }
  }
  
  @HostListener('document:click', ['$event'])
  playSound() {
    this.audio.src="../../../../assets/pum2.mp3";
    this.audio.load();
    this.audio.play();
  }

  onClick() {
    this.state = this.movenumPosition;
    if (this.clicksAllowed > 0) {
      this.clickCounter++;
      this.clicksAllowed--;
      this.echo.private('home').whisper('message', {
      message: 'JALAME ESTA'
      });
      console.log(this.echo)
      this.clicksAllowed--;  
    }
    if (this.clicksAllowed === 0) {
      this.startTimer();
    }
    if (this.clickCounter === 6) {
      this.showWinnerModal = true;
      this.state = '';
      const token = localStorage.getItem('token');
      this.echo.private('home').whisper('message', {
        token: token
      }); 

      console.log(token)
      this.echo.private('home').listen('UserDetailEvent', (data: any) => {
        console.log(data.user);
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

  //Esto De Aqui Es Para Que Haga El Conteo De Los Tiros
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
  //Reinicia Los Tiros Luego De 2 Segundos
  resetClicks() {
    this.clicksAllowed = 2;
  }

  listenToChannel() {
    this.echo.channel('home').listen('NewMessage', (data: any) => {
      console.log(data);
    });
  }
}