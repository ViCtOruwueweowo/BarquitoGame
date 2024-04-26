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
    //  'http://192.168.100.128:8000/api/login',
      'http://192.168.115.16:8000/api/login',
      user
    );
  }
}
