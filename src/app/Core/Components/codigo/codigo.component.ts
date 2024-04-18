import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Code } from '../../Interface/code';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../Service/register.service';
import { CodeService } from '../../Service/code.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Coderesponse } from '../../Interface/coderesponse';

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,FormsModule,NgFor,NgIf],
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent {
public code:Code={
  code:'',
  token:'',
}

public verifyCode() {
  this.codeService.verificarcodigo(this.code).subscribe(
    (response: Coderesponse) => {
      const token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['/Pantalla']);
    },
    (error) => {
      console.error('Error al iniciar sesiónes:', error);
      setTimeout(() => {
        location.reload(); 
      }, 2000); 
    }
  )
}


constructor(
  private formBuilder:FormBuilder,
  private codeService:CodeService,
  private router:Router
  ){}

  formuser = this.formBuilder.group({
    codes: ['',[Validators.required,Validators.minLength(6),Validators.pattern('^[0-9]*$')]],
  })

  get codes() {
    return this.formuser.controls.codes
   }
}


