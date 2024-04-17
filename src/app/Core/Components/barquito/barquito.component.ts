import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-barquito',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './barquito.component.html',
  styleUrl: './barquito.component.css',
  animations: [
    trigger('moveImage', [
      state('start', style({ transform: 'translateX(0)', opacity: 1 })),
      state('end', style({ transform: 'translateX(100vw)', opacity: 1 })),
      transition('* => *', animate('{{speed}}ms ease-in-out')) // Utiliza la interpolación para insertar la velocidad
    ])
  ],
})
export class BarquitoComponent {
  state: string = 'start';
  showNumber: boolean = false;
  number: number = 7;
  repeatCount: number = 0;
  images: number[] = Array(7).fill(0);
  speed: number = 10000;

 toggleMovement() {
    this.state = (this.state === 'start' ? 'end' : 'start');
    if (this.state === 'end') {
      setTimeout(() => {
        this.state = 'start';
      }, this.speed + 500); 
    }
  }

  handleClick() {
    this.number--;
    this.images.pop();
    this.showNumber = true;
    if (this.state === 'end') {
      this.state = 'start';
      setTimeout(() => {
        this.state = 'end';
      }, 500);
    }
    this.speed /= 2; 
  }
}
