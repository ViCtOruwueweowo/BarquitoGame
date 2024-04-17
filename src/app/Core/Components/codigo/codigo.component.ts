import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Code } from '../../Interface/code';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../Service/register.service';
import { CodeService } from '../../Service/code.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

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
}

public veridyCode() {
  this.codeService.code(this.code).subscribe(
    (response) => {
      this.router.navigate(['/Game']);
    }
  );
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


