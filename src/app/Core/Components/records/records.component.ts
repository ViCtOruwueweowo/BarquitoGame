import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../Interface/users';
import { UsersService } from '../../Service/users.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent {
usersList:Users={
  name:'',
  wins:'',
  losses:'',
};

constructor(
  private usersService:UsersService,
  private router:Router
){}

ngOnInit():void{
  this.getusers();
}

getusers(){
  this.usersService.getUsers().subscribe({
    next:(result)=>{
        this.usersList = result.data;
    }
})

}

}
