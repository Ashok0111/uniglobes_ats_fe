import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
    })

export class Services {
  constructor(
    private readonly httpClient: HttpClient
  ) { }



  createlead(payload: any): Observable<any> {
    return this.httpClient.post<any>(environment.API_URL+'api/create_user_lead/', payload);
  }

  getMyLeads(): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL+'api/fetch_my_leads/');
  }



}
