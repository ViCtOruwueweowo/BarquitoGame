import { Component } from '@angular/core';
import { BarquitoComponent } from '../barquito/barquito.component';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [BarquitoComponent],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {

}
