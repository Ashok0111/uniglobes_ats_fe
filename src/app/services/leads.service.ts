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
    //fetch_lead_stats
    getMyLeadsStats(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/fetch_lead_stats/');
    }
    //delete_leads
    deleteLeads(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/delete_leads/',payload);
    }
    getMyLeadsById(payload:any): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/get_leads_id/?id='+payload);
        }
    updateMyLeadsById(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/update_leads/',payload);
    }

}
