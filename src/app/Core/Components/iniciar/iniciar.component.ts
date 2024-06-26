import { Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../Service/game.service';
import { Game } from '../../Interface/game';
import { HttpHeaders } from '@angular/common/http';
import { PantallaCargaComponent } from '../pantalla-carga/pantalla-carga.component';
import { UsersService } from '../../Service/users.service';
import { MiDirectivaDirective } from '../../../mi-directiva.directive';


@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [RouterLink,PantallaCargaComponent,MiDirectivaDirective],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css',
  
})

export class IniciarComponent {
  public game:Game={
    player1:'',
    player2:'',
    id:'',
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  constructor(
    private el:ElementRef,
    private router: Router,
    private gameService:GameService,
  ) { }

  public crearPartida(){
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.CrearPartida(this.game, headers).subscribe(
      (response)=>{
     setTimeout(()=>{
      this.router.navigate(['/Carga'])
     },500)   
      }
    )
  }

  public entrarPartida(){
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.EntrarPartida(this.game, headers).subscribe(
      (response)=>{
        this.router.navigate(['/Game'])
      }
    )
  }

}
