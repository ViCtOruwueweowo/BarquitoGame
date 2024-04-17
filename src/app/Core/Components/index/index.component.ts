import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Service/user.service';
import { User } from '../../Interface/user';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor,CommonModule,ReactiveFormsModule],
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
    this.message = "asdasdsad";
    this.loading = true;
    this.imageUrl = 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700';
    this.userService.login(this.user).subscribe(
      (response) => {
        this.loading = false;
        this.router.navigate(['/Code']);
      }
      ,
      (error) => {
        this.loading = false;
        if (error.status === 405) {
          this.router.navigate(['']);
        }
      }
    );
  }
  
  formuser = this.formBuilder.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    pass: ['', [Validators.required, Validators.minLength(8)]],
  })
}
