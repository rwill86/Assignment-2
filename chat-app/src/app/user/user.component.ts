import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image/image.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
     public user;
	 public selectedfile = null;
	 public imagepath = '';
	 
     public constructor(private router:Router, private form:FormsModule, private imgServ:ImageService){
	 }

     public ngOnInit(){
		 if(sessionStorage.getItem('user') === null){
             // User has not logged in, reroute to login
             this.router.navigate(['/login']);
         } else{
             var user = JSON.parse(sessionStorage.getItem('user'));
             this.user = user;
             console.log(this.user);
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
}
