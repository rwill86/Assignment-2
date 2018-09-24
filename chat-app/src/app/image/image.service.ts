import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
//Class SocketService
export class ImageService{
     private api:string = 'http://localhost:3000/api/';
     public constructor(private http:HttpClient){ 

	 }

	 public ngOnInit(){		 
	 }
	 
	 public imgupload(fd){
		 return this.http.post<any>(this.api + 'upload', fd);
	 }

}