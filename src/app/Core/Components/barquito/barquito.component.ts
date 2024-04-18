import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IniciarComponent } from '../iniciar/iniciar.component';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../Interface/users';
import { UsersService } from '../../Service/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
export class BarquitoComponent {
  state = 'start';
  counter = 0;
  clickCounter = 0;
  missClickCounter = 0;
  clicksAllowed = 2;
  timer = 5;
  showModal = false;

  ngOnInit() {
    this.animateImage();
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
      this.showModal = true;
      this.state = '';
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


  usersList:Users[]=[];

  constructor(
    private usersService:UsersService,
  ){}





}