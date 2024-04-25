import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Interface/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URL: string = 'http://192.168.100.128:8000/api/show';
  //API_URL: string = 'http://192.168.126.98:8000/api/show';
  
  constructor(private httpClient:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  public getUser(): Observable<Users> {
    const headers = this.getHeaders();
    return this.httpClient.get<Users>(this.API_URL, {headers});
  }

  public getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<Users>(this.API_URL, {headers}).pipe(res => res);
  }
}
