import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { User } from '../../Interface/user';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MiDirectivaDirective } from '../../../mi-directiva.directive';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor,CommonModule,ReactiveFormsModule,MiDirectivaDirective],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
 
constructor(
  private formBuilder:FormBuilder,
  private userService:UserService,
  private router:Router
  ){}

  public user:User={
    name:'',
    password:''
  }

  loading:boolean=false;
  message:string='';
  imageUrl: string = '';

  public login() {
    this.message = "Ups Algo Salio Mal, Correo u Contraseña Incorrectos";
    this.loading = true;
    this.imageUrl = 'https://media.tenor.com/t5DMW5PI8mgAAAAj/loading-green-loading.gif';
    this.userService.login(this.user).subscribe(
      (response) => {
        this.loading = false;
        this.router.navigate(['/Code']);
      }
      ,
      (error) => {
        console.error('Error al iniciar sesiónes:', error);
        this.message = '¡Ups!, Error En Correo O Contraseña'; 
        this.loading = false;
        setTimeout(() => {
          location.reload(); 
        }, 2000); 
      }
    );
  }
  
  formuser = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
  })
}
