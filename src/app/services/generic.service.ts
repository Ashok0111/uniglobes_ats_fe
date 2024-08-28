import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })

export class genericservice {
  constructor(
    private readonly httpClient: HttpClient
  ) { }
accessToken:string;
get_userrole(){
    this.accessToken=localStorage.getItem('token')||''
    if(this.accessToken){
        const decoded:any = jwtDecode(this.accessToken);
        return decoded.user_type
    }else{
        return "invalid"
    }
}
get_usermail(){
    this.accessToken=localStorage.getItem('token')||''
    if(this.accessToken){
        const decoded:any = jwtDecode(this.accessToken);
        return decoded.email_id
    }else{
        return "invalid"
    }
}
get_username_f(){
    this.accessToken=localStorage.getItem('token')||''
    if(this.accessToken){
        const decoded:any = jwtDecode(this.accessToken);
        return decoded.first_name
    }else{
        return "invalid"
    }
}
get_userrole_token(token:string){
    if(token){
        const decoded:any = jwtDecode(token);
        return decoded.user_type
    }else{
        return "invalid"
    }
}
set_usertoken(token:string){
    this.accessToken=token;
}
logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('default_path');
}
public refreshSubject = new Subject<void>();
refresh$ = this.refreshSubject.asObservable();

}
