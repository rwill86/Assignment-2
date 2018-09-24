// ============================================
// This service is responsible for CRUD actions 
// to the user APIs
// ============================================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
     private api:string = 'http://localhost:3000/api/';

     public constructor(private http:HttpClient){		 
	 }

     public login(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'login', body, httpOptions);
     }

     public create(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'user/create', body, httpOptions);
     }

     delete(username){
         return this.http.delete(this.api + 'user/delete/'+username);
     }
}
