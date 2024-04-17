import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Code } from '../Interface/code';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  API_URL='http://127.0.0.1:8000/api/verifycode';

  constructor(private httClient:HttpClient) { }

  public code(code:Code) {
    return this.httClient.post(
      'http://127.0.0.1:8000/api/verifycode',
      code
    );
  }
}
