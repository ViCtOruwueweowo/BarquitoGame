import { Component, HostListener } from '@angular/core';
import { BarquitoComponent } from '../barquito/barquito.component';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [BarquitoComponent],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
audio = new Audio();

@HostListener('document:click', ['$event'])
playSound() {
  this.audio.src="../../../../assets/pum2.mp3";
  this.audio.load();
  this.audio.play();
}
}
