import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
    })

export class WebsiteServices {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

    listBlog(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/blogs/');
    }
    createBlog(payload: any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/blog/create/', payload);
    }
    updateBlog(payload: any,tgt_payload:any): Observable<any> {
        return this.httpClient.put<any>(environment.API_URL+'api/blog/update/'+payload+'/', tgt_payload);
    }
    getBlogDetail(payload: any): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/blog/'+payload.id+'/');
    }
    deleteBlog(payload:any): Observable<any> {
        return this.httpClient.delete<any>(environment.API_URL+'api/blog/delete/'+payload.id+'/');
    }
    listBlogs(payload: any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'blog/delete/', payload);
    }

    listEvent(): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/events/');
    }
    createEvent(payload: any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'api/event/create/', payload);
    }
    updateEvent(payload: any,tgt_payload:any): Observable<any> {
        return this.httpClient.put<any>(environment.API_URL+'api/event/update/'+payload+'/', tgt_payload);
    }
    getEventDetail(payload: any): Observable<any> {
        return this.httpClient.get<any>(environment.API_URL+'api/event/'+payload.id+'/');
    }
    deleteEvent(payload:any): Observable<any> {
        return this.httpClient.delete<any>(environment.API_URL+'api/event/delete/'+payload.id+'/');
    }
    listEvents(payload: any): Observable<any> {
        return this.httpClient.post<any>(environment.API_URL+'event/delete/', payload);
    }
}
