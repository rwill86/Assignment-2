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
	 public addImage(data){
		 this.socket.emit('addImage', data);
	 }
	 //Join and leave room
	 public joinRoom(data){
		 this.socket.emit('addRoom', data);
	 }
	 
	 public leaveRoom(data){
		 this.socket.emit('leaveRoom', data);
	 }
	 addRoom
	 //Send And get Messages
	 public sendMessages(message){
		 this.socket.emit('addMessage', message);
	 }

	 public getMessages = () => {
         return Observable.create((observer) => {
             this.socket.on('message', (message) => {
                 observer.next(message);
             });
         });
     }
}