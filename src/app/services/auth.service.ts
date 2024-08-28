import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
    })

export class APISERVICE {
  constructor(
    private readonly httpClient: HttpClient
  ) { }



  login(payload: any): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL+'auth/token/', payload);
  }


}
