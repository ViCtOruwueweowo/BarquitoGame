import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-carga',
  standalone: true,
  imports: [],
  templateUrl: './pantalla-carga.component.html',
  styleUrl: './pantalla-carga.component.css'
})
export class PantallaCargaComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/Game']); 
    }, 5000);
  }
}
