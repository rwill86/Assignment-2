import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket/socket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ImageService } from '../image/image.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
     @Input() channel;
	 public user
	 public messages = [];
	 public message:string;
	 public errors = [];
	 public connection;
	 public selectedfile = null;
	 public imagepath = '';
	 
     public constructor(private router:Router, private form:FormsModule, private sockServ:SocketService, private imgServ:ImageService){
	 }

     public ngOnInit(){
		 if(sessionStorage.getItem('user') === null){
             // User has not logged in, reroute to login
             this.router.navigate(['/login']);
         } else{
		     var user = JSON.parse(sessionStorage.getItem('user'));
             this.user = user;
             console.log(this.user);
			 this.setUser(this.user.username);
		 }
		 this.getMes();
     }
	 //Upload image
	 public onFileSelected(event){
		 console.log(event);
		 this.selectedfile = event.target.files[0];
		 const fd = new FormData();
		 fd.append('image', this.selectedfile, this.selectedfile.name);
		 this.imgServ.imgupload(fd).subscribe(res =>{
			 this.imagepath = res.data.filename;
			 console.log(res.data.filename + ' , ' + res.data.size);
			 var id = '';
			 if(this.channel != null){
				 console.log('Sending Photo.');
			     this.sockServ.addImage(this.imagepath, 'Lobby');
			     this.getMes();
			 } else{
				 console.log('Sending Photo.');
				 id = 'Lobby';
				 this.sockServ.addImage(this.imagepath, 'Lobby');
			     this.getMes();
			 }
			 return true;
		 }); 
	 } 	 
	 //setUser
	 public setUser(data){
		 this.sockServ.setUser(data);
	 }
	 //Send and get messages
	 public getMes(){
		 this.connection = this.sockServ.getMessages().subscribe((message:string) => {
			 this.messages.push(message);
			 this.message = null;
		 });
	 }	
 	 
	 public sendMessage(){
		 console.log('messsage: ' + this.message);
		 if(this.message != null){
			 var id = '';
			 if(this.channel != null){
				 console.log('Sending message.');
				 id = this.channel.name;
		         this.sockServ.sendMessages(this.message, id);
				 this.getMes();
			 } else{
			     console.log('Sending message.');
				 id = 'Lobby';
		         this.sockServ.sendMessages(this.message, id);
				 this.getMes();
			 }
	     } else{
			 document.getElementById('mes').style.border = '2px solid #C70039';
			 var em = 'Can not send message.';
             document.getElementById('error3').innerHTML = '' + em + '';
		 }
	 }		 
	 //Join and exit rooms	 
	 public joinRoom(){
		 var data = '';
		 if(this.channel != null){
		     console.log(this.channel);
			 data = this.channel.name;
			 this.sockServ.joinRoom(data);
	     } else{
		     var data = 'Lobby';
		     console.log(data);
		     this.sockServ.joinRoom(data);
		 }
	 }
	 
	 public exitRoom(){
		 var data = '';
		 if(this.channel != null){
		     console.log(data);
			 data = this.channel.name;
		     this.sockServ.leaveRoom(data);
		 }
	 }

	 //Destory connection
	 public ngOnDestory(){
		 if(this.connection){
			 this.connection.unsubscribe();
			 var data = 'Lobby user disconnected.';
		     console.log(data);
		     this.sockServ.leaveRoom(data);
		 }
	 }

}
