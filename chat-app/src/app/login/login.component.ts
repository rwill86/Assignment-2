import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
     public username:string;
     private password:string;

     constructor(private router:Router, private form:FormsModule, private _userService:UserService) {
     }
 
     ngOnInit(){
         if(sessionStorage.getItem('user') !== null || localStorage.getItem('user') !== null){
             this.router.navigate(['/home']);
         }
     }

     loginUser(event){
         event.preventDefault();
         console.log(this.username);
         var user = {
             username: this.username,
             password: this.password
         }
    
         this._userService.login(user).subscribe(
             data => { 
                 console.log(data);
                 if(data != false){
                     var temp = JSON.stringify(data);
                     sessionStorage.setItem('user', temp); 
                     localStorage.setItem('user', temp);					 
                     this.router.navigate(['/home']); 
                 } else{
                     var message = 'Your username and password did not match.';
					 document.getElementById('username').style.border = '2px solid #C70039';
		             document.getElementById('email').style.border = '2px solid #C70039';
                     document.getElementById('error').innerHTML = message;
                 }
             },
             error => {
                 console.error(error);
             }
		 );
     }
}
