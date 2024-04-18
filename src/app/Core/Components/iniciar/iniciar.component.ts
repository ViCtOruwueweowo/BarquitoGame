import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css'
})
export class IniciarComponent {
  
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  constructor(
    private router: Router,
  ) { }
}
