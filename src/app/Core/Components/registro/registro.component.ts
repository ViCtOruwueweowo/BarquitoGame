import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Register } from '../../Interface/register';
import { RegisterService } from '../../Service/register.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,RouterModule,NgIf,NgFor,ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

constructor(
private formBuilder:FormBuilder,
private registerService:RegisterService,
private router:Router
){}

public register:Register={
name:'',
email:'',
password:''
}

public createUser() {
  this.registerService.createService(this.register).subscribe(
    (response) => {
      window.alert('Registro Exitoso, Activa tu cuenta en: ' + this.register.email);
      this.router.navigate(['']);
    }
  );
}
get name() {
  return this.formuser.controls.name
 }
 get email() {
  return this.formuser.controls.email
 }
 get pass() {
   return this.formuser.controls.pass
 }
 
formuser = this.formBuilder.group({
  name: ['',[Validators.required,Validators.minLength(3)]],
  email:['',[Validators.required,Validators.email]],
  pass: ['', [Validators.required, Validators.minLength(7)]],
})
}
