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
		 }
     }
	 //Upload image
	 public onFileSelected(event){
		 console.log(event);
		 this.selectedfile = event.target.files[0];
	 }
	 
	 public onUpload(){
		 const fd = new FormData();
		 fd.append('image', this.selectedfile, this.selectedfile.name);
		 this.imgServ.imgupload(fd).subscribe(res =>{
			 this.imagepath = res.data.filename;
			 console.log(res.data.filename + ' , ' + res.data.size)
		 }); 
	 }
	 //Send and get messages
	 public getMes(){
		 this.connection = this.sockServ.getMessages().subscribe((message:string) => {
			 this.messages.push(message);
			 this.message = '';
		 });
	 }
	 
	 public sendMessage(){
		 if(this.message !== ''){
		     var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 console.log('Sending message');
		     this.sockServ.sendMessages(this.user.username  + ' - ' + this.message + ' - ' + h + ':' + m);
	     } else{
			 var me = document.getElementById('mes');
			 me.style.border = '2px solid #C70039';
		 }
	 }	 
	 //Destory connection
	 public ngOnDestory(){
		 if(this.connection){
			 this.connection.unsubscribe();
		 }
	 }

}
