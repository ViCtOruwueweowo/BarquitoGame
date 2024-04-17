import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../Interface/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public createService(register:Register) {
    return this.httpClient.post(
      'http://127.0.0.1:8000/api/reg',
      register
    );
  }

}
