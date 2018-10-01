import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image/image.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{
     public user;
	 public userss;
	 public username;
	 public password;
	 public email;
	 public selectedfile = null;
	 public imagepath;
	 public imagesize;
	 
     public constructor(private router:Router, private form:FormsModule, private imgServ:ImageService, private userServ:UserService){
	 }

     public ngOnInit(){
		 if(sessionStorage.getItem('user') === null){
             if(localStorage.getItem('user') !== null){
			     //local storage
			     var user = JSON.parse(localStorage.getItem('user'));
				 sessionStorage.setItem('user', user);
                 this.user = user;
                 console.log(this.user);
		     } else{
                 // User has not logged in, re-route to login
			     console.log('Not validated.');
			     sessionStorage.clear();
                 this.router.navigate(['/login']);
			 }
         } else{
			 //Session storage
             var user = JSON.parse(sessionStorage.getItem('user'));
             this.user = user;
             console.log(this.user);
         }
		 this.getUsers();
     }
	 //logout
     public logout(){
		 sessionStorage.clear();
		 localStorage.clear();
         this.router.navigate(['/login']);
     }
	 
	 public userAccount(){
		 this.router.navigate(['/user']);
	 }	 
	 //Upload image
	 public onFileSelected(event){
		 console.log(event);
		 this.selectedfile = event.target.files[0];
	 }
	 
	 public onUpload(){
		 const fd = new FormData();
		 if(this.selectedfile != null){
		     fd.append('image', this.selectedfile, this.selectedfile.name);
		     this.imgServ.imgupload(fd).subscribe(res =>{
			     this.imagepath = res.data.filename;
			     console.log(res.data.filename + ' , ' + res.data.size);
				 var u = {
			         _id: this.user._id,
                     username: this.user.username,
                     password: this.user.password,
					 email: this.user.email,
			         userLogo: this.imagepath,
			         permissions: this.user.permissions
                 }
		         this.updateUser(u);
			     var temp = JSON.stringify(u);
                 sessionStorage.setItem('user', temp); 
                 localStorage.setItem('user', temp);
				 var newimage = document.getElementById('imageID') as HTMLImageElement;
				 newimage.src = 'images/' + this.imagepath + '';
				 document.getElementById('errorImage').innerHTML = '';
				 return true;
		     }); 
             this.getUsers();	 
		 } else{
			 document.getElementById('img').style.border = '2px solid #C70039';		 
			 var em = 'File is empty.';
             document.getElementById('errorImage').innerHTML = '' + em + '';
		 }
	 }
	 //get User
	 public getUsers(){
		 this.userServ.getUsers().subscribe(
		     data => {
				 console.log(data);
				 this.userss = data;
			 },
			 err => console.error(err),
             () => console.log('done loading users')			 
		 );
	 }
	 //create User
	 public createUser(username, password, email){	 
		 var user = {
             username: username,
             password: password,
			 email: email,
			 userLogo: 'logo1.PNG',
			 permissions: 0,
         }
		 if(username != null && password != null && email != null){
		     this.userServ.create(user).subscribe(
                 data => { 
			         this.username = '';
				     this.password = '';
					 this.email = '';
                     this.getUsers();
					 document.getElementById('use').style.border = '';
			         document.getElementById('pas').style.border = '';
					 document.getElementById('ema').style.border = '';
					 document.getElementById('error').innerHTML = '';
                     return true;
                 },
                 error => {
                     console.error(error);
                 }
             )
		 } else{
			 document.getElementById('use').style.border = '2px solid #C70039';
			 document.getElementById('pas').style.border = '2px solid #C70039';
			 document.getElementById('ema').style.border = '2px solid #C70039';
			 var em = 'Inputs are empty.';
             document.getElementById('error').innerHTML = '' + em + '';
		 }
	 }
	 //update User
	 public updateUser(user){
		 if(user.username != null || user.password != null  || user.email != null){
		     this.userServ.update(user).subscribe(
                 data => {
                     this.getUsers();
					 var id = user._id;
					 document.getElementById(id).style.border = '';
			         document.getElementById(id).style.border = '';
					 document.getElementById(id).style.border = '';
                     document.getElementById('error').innerHTML = '';
                     return true;
                 },
                 error =>{
                     console.error('Error saving user');
                 }
             )
	     } else{
			 var id = user._id;
			 document.getElementById(id).style.border = '2px solid #C70039';
			 document.getElementById(id).style.border = '2px solid #C70039';
			 document.getElementById(id).style.border = '2px solid #C70039';
			 var em = 'Inputs are empty.';
             document.getElementById('error').innerHTML = '' + em + '';
		 }
	 }
	 //delete User
	 public deleteUser(data){
		 this.userServ.deleteUser(data).subscribe(
             data => {
                 this.getUsers();
                 return true;
             },
             error => {
                 console.error('Error deleting user');
             }
         )
	 }
}
