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
    addEducation(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/add_lead_education/',payload);
    }
    updateEducation(payload:any): Observable<any> {
        return this.httpClient.put<any>(environment.API_URL+'api/update_lead_education/',payload);
    }
    getEducation(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/get_lead_education/');
    }
    addExperience(payload:any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/add_lead_exp/',payload);
    }
    getExperience(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/get_lead_exp/');
    }
    updateExperience(payload:any): Observable<any> {
        return this.httpClient.put<any>(environment.API_URL+'api/update_lead_exp/',payload);
    }
    deleteMyEducation(payload:any): Observable<any> {
        return this.httpClient.delete<any>(environment.API_URL+'api/delete_my_education/'+payload);
    }
    deleteMyExperience(payload:any): Observable<any> {
        return this.httpClient.delete<any>(environment.API_URL+'api/delete_my_exp/'+payload);
    }
    getMyConversation(payload:any): Observable<any>{
        return this.httpClient.get<any>(environment.API_URL+'api/conversation/'+payload);
    }
    setMyConversation(lead_id:any,payload:any): Observable<any>{
        return this.httpClient.post<any>(environment.API_URL+'api/conversation/'+lead_id,payload);
    }


//update_my_documents
}
