import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
    })

export class shareService {
  constructor() { }
  newLeads = new BehaviorSubject({leads:[],labels:[]});
  // expose the BehaviorSubject as an Observable
  currentQuote = this.newLeads.asObservable();
  // function to update the value of the BehaviorSubject
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
  // expose the BehaviorSubject as an Observable
  newLeadsCompletedOB = this.newLeadsCompleted.asObservable();
  // function to update the value of the BehaviorSubject
  updateLeadsCompleted(param:any){
    this.newLeadsCompleted.next(param);
  }


}
