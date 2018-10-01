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
export class ChannelsService{
     private api:string = 'http://localhost:3000/api/';

     constructor(private http:HttpClient){		 
	 }

     public createChannel(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'channel/create', body, httpOptions);
     }

     public deleteChannel(channelName, username){
         return this.http.delete(this.api + 'channel/delete/' + channelName);
     }
	 
	 public updateMembers(data){
         var body = JSON.stringify(data);
         return this.http.put(this.api +'channel/' + data._id, body, httpOptions);
     }
	 
     public getChannels(data){
         var body = JSON.stringify(data);
         return this.http.post(this.api + 'channels', body, httpOptions);
     }
}
