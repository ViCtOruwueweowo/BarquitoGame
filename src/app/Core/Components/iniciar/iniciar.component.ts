import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../web-socket.service';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../Service/game.service';
import { Game } from '../../Interface/game';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css'
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
    private router: Router,
    private gameService:GameService, private websocketService: WebsocketService, // aquí se inyecta el servicio
  ) { }

  ngOnInit() {
    this.websocketService.onNewMessage().subscribe(message => {
      console.log("mensaje recibido: ", message);
    });
  }

  public crearPartida(){
    const token = localStorage.getItem('token'); // Asegúrate de reemplazar 'token' con la clave que usaste para almacenar el token en el Local Storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.CrearPartida(this.game, headers).subscribe(
      (response)=>{
        this.websocketService.sendMessage('Partida creada');
        this.router.navigate(['/Game'])
      }
    )
  }

  public entrarPartida(){
    const token = localStorage.getItem('token'); // Asegúrate de reemplazar 'token' con la clave que usaste para almacenar el token en el Local Storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.gameService.EntrarPartida(this.game, headers).subscribe(
      (response)=>{
        this.router.navigate(['/Game'])
      }
    )
  }
}
