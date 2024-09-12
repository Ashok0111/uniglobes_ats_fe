import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
    })

export class StudentServices {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

    getMyProfile(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/get_my_profile/');
        }
    updateMyLeadsById(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/update_leads/',payload);
    }

    getMyApplications(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/get_my_applications/');
    }
    setMyprofile(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/update_my_profile/',payload);
    }
    getMyApplicationDetailByID(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/get_my_application_byid/',payload);
    }
    updateMyDocument(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/update_my_documents/',payload);
    }
    downloadMyDocument(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/download_my_document/',payload);
    }
    deleteMyDocument(payload:any): Observable<any> {
        return this.httpClient.delete<any>(environment.API_URL+'api/delete_my_document/'+payload);
    }


//update_my_documents
}
