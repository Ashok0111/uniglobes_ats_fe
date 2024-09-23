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
  reset_password(payload: any,url_param:any): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL+'api/password_reset/'+url_param,payload);
  }
  changePassword(payload:any): Observable<any>{
    return this.httpClient.post<any>(environment.API_URL+'api/change_password/',payload);
}
}
