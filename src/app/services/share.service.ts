import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })

export class shareService {
    profileData={"email": "",
        "first_name": "",
        "last_name": "",
        "phone_number": "",
        "c_address": "",
        "p_address": "",
        "date_joined": ""}
  constructor() { }
  newLeads = new BehaviorSubject({leads:[],labels:[]});
  currentQuote = this.newLeads.asObservable();
  updateLeads(param:any){
    this.newLeads.next(param);
  }

  newLeadsInprogress = new BehaviorSubject({leads:[],labels:[]});
  // expose the BehaviorSubject as an Observable
  newLeadsIPOB = this.newLeadsInprogress.asObservable();
  // function to update the value of the BehaviorSubject
  updateLeadsInprogress(param:any){
    this.newLeadsInprogress.next(param);
  }


  newLeadsAll = new BehaviorSubject({count:0});
  // expose the BehaviorSubject as an Observable
  newLeadsAllOB = this.newLeadsAll.asObservable();
  // function to update the value of the BehaviorSubject
  updateLeadsAll(param:any){
    this.newLeadsAll.next(param);
  }


  newLeadsCompleted = new BehaviorSubject({leads:[],labels:[]});
  newLeadsCompletedOB = this.newLeadsCompleted.asObservable();
  updateLeadsCompleted(param:any){
    this.newLeadsCompleted.next(param);
  }

  updateProfile = new BehaviorSubject(this.profileData);
  updateProfileOB = this.updateProfile.asObservable();
  updateProfileData(param:any){
    this.updateProfile.next(param);
  }

  docTypes = new BehaviorSubject({});
  docTypesOB = this.docTypes.asObservable();
  setdocTypesOB(param:any){
    this.docTypes.next(param);
  }

}
