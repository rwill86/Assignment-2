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
		     this.getMes();
			 this.setUser(this.user.username);
		 }
     }
	 //Upload image
	 public onFileSelected(event){
		 console.log(event);
		 this.selectedfile = event.target.files[0];
		 const fd = new FormData();
		 fd.append('image', this.selectedfile, this.selectedfile.name);
		 //this.imgServ.imgupload(fd).subscribe(res =>{
			 //this.imagepath = res.data.filename;
			 //console.log(res.data.filename + ' , ' + res.data.size);
			 //this.sockServ.sendImage(this.imagepath);		 
		 //}); 
		 this.sockServ.sendMessages(this.message);
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
			 console.log('Sending message');
		     this.sockServ.sendMessages(this.message);
	     } else{
			 document.getElementById('mes').style.border = '2px solid #C70039';
			 var em = 'Can not send message.';
             document.getElementById('error').innerHTML = '' + em + '';
		 }
	 }	 
	 //Destory connection
	 public ngOnDestory(){
		 if(this.connection){
			 this.connection.unsubscribe();
		 }
	 }

}
