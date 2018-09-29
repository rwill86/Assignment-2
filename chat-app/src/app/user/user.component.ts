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
	 public selectedfile = null;
	 public imagepath = '';
	 
     public constructor(private router:Router, private form:FormsModule, private imgServ:ImageService, private userServ:UserService){
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
		 fd.append('image', this.selectedfile, this.selectedfile.name);
		 this.imgServ.imgupload(fd).subscribe(res =>{
			 this.imagepath = res.data.filename;
			 console.log(res.data.filename + ' , ' + res.data.size)
		 }); 
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
	 
	 public createUser(username, password){	 
		 var user = {
             username: username,
             password: password,
			 userLogo: '',
			 permissions: 0,
         }
		 this.userServ.create(user).subscribe(
             data => { 
                 this.getUsers();
                 return true;
             },
             error => {
                 console.error(error);
             }
         )
	 }
	 
	 public updateUser(user){
		 this.userServ.update(user).subscribe(
             data => {
                 this.getUsers();
                 return true;
             },
             error =>{
                 console.error('Error saving user');
             }
         )
	 }
	 
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
