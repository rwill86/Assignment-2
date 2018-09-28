import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService{
     private url = 'http://localhost:3000';
     private socket;

     public constructor(){ 
	     this.socket = io(this.url);
	 }

	 public ngOnInit(){		 
	 }
	 
	 public setUser(data){
		 this.socket.emit('setUser' , data);
	 }
	 public addImage(data){
		 this.socket.emit('addImage', data);
	 }
	 //Send Messages
	 public sendMessages(message){
		 this.socket.emit('addMessage', message);
	 }
	 //Get Messages
	 public getMessages = () => {
         return Observable.create((observer) => {
             this.socket.on('message', (message) => {
                 observer.next(message);
             });
         });
     }
}