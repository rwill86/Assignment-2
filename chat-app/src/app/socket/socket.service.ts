import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
//Injectable
@Injectable({
  providedIn: 'root'
})
//Class SocketService
export class SocketService{
     private url = 'http://localhost:3000';
     private socket;
	 //Constructor
     public constructor(){ 
	     this.socket = io(this.url);
	 }
	 //Init
	 public ngOnInit(){		 
	 }
	 //Send Messages
	 public sendMessages(message){
		 this.socket.emit('add-message', message);
	 }
	 //Get User
	 public getUser(username){
		 this.socket.emit('add-user', username);
	 }
	 //Get room
	 public addRoom(roomname){
		 this.socket.emit('add-room', roomname);
	 }
	 //remove user
	 public removeUser(username){
		 this.socket.emit('remove-user', username);
	 }
	  //remove room
	 public removeRoom(roomname){
		 this.socket.emit('remove-room', roomname);
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