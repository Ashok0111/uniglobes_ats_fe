import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    })

export class APISERVICE {
 private API_URL = 'http://localhost:8000/';
  constructor(
    private readonly httpClient: HttpClient
  ) { }



  login(payload: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL+'auth/token/', payload);
  }


}
