import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../Service/web-socket.service';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../Service/game.service';
import { Game } from '../../Interface/game';
import { HttpHeaders } from '@angular/common/http';
import { PantallaCargaComponent } from '../pantalla-carga/pantalla-carga.component';
import { UsersService } from '../../Service/users.service';


@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [RouterLink,PantallaCargaComponent],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css'
})

export class IniciarComponent implements OnInit {
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
    private router: Router,
    private usersService:UsersService,
    private gameService:GameService,
     private websocketService: WebsocketService, // aquí se inyecta el servicio
  ) { }

  //ngOnInit() {
  //  this.websocketService.onNewMessage().subscribe(message => {
  //    console.log("mensaje recibido: ", message);
  //  });
  //}
  ngOnInit() {
  
  }

  public crearPartida(){
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.CrearPartida(this.game, headers).subscribe(
      (response)=>{
        this.router.navigate(['/Game'])
      }
    )
  }

  public entrarPartida(){
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.EntrarPartida(this.game, headers).subscribe(
      (response)=>{
        this.router.navigate(['/Carga'])
      }
    )
  }
}
