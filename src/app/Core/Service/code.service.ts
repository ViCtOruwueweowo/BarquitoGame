import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Code } from '../Interface/code';
import { Coderesponse } from '../Interface/coderesponse';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  //API_URL='http://192.168.100.128:8000/api/verifycode';
  API_URL='http://192.168.255.70:8000/api/verifycode';

  constructor(private httClient:HttpClient) { }

  public verificarcodigo(code:Code):Observable<Coderesponse> {
    return this.httClient.post<Coderesponse>(
    //  'http://192.168.100.128:8000/api/verifycode',
      'http://192.168.255.70:8000/api/verifycode',
      code
    );
  }
}
