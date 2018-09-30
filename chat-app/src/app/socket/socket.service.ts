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
	 //set user
	 public setUser(data){
		 this.socket.emit('setUser' , data);
	 }
	 //add image 
	 public addImage(data, id){
		 this.socket.emit('addImage', data, id);
	 }
	 //Join and leave room
	 public joinRoom(data){
		 this.socket.emit('addRoom', data);
	 }
	 
	 public leaveRoom(data){
		 this.socket.emit('leaveRoom', data);
	 }
	 //Send And get Messages
	 public sendMessages(message, id){
		 this.socket.emit('addMessage', message, id);
	 }

	 public getMessages = () => {
         return Observable.create((observer) => {
             this.socket.on('message', (message) => {
                 observer.next(message);
             });
         });
     }
}