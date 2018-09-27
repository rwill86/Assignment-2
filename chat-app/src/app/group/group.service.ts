// ============================================
// This service is responsible for CRUD actions 
// to the group APIs
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
export class GroupService {
     private api:string = 'http://localhost:3000/api/';

     constructor(private http:HttpClient){		 
	 }

     public createGroup(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'group/create', body, httpOptions);
     }

     public deleteGroup(groupName, username){
         return this.http.delete(this.api + 'group/delete/' + groupName);
     }
	 
     public getGroups(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'groups', body, httpOptions);
     }
}
