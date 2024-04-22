import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Users } from '../Interface/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //API_URL: string = 'http://192.168.1.75:8000/api/show';
  API_URL: string = 'http://192.168.100.128:8000/api/show';
  constructor(private httpClient:HttpClient) { }

  public getUser(users:Users): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this.API_URL, { headers });
  }

}
