import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private httClient:HttpClient) { }

  public login(user:User) {
    return this.httClient.post(
      'http://127.0.0.1:8000/api/login',
      user
    );
  }
}
