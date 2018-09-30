import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { GroupService } from '../group/group.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
     public user;
     public selectedGroup;
     public selectedChannel;
     public groups = [];
     public channels = [];
     public newGroupName:String;
	 public newChannelName:String;

     public constructor(private router: Router, private _groupService:GroupService){
	 }

     public ngOnInit(){
         if(sessionStorage.getItem('user') === null){
             // User has not logged in, reroute to login
             this.router.navigate(['/login']);
         } else{
             var user = JSON.parse(sessionStorage.getItem('user'));
             this.user = user;
             console.log(this.user);
             this.groups = user.groups;
             if(this.groups.length > 0){
                 this.openGroup(this.groups[0].name);
                 if(this.groups[0].channels > 0){
                     this.channelChangedHandler(this.groups[0].channels[0].name);
                 }
             }
         }
     }

     public createGroup(event){
         event.preventDefault();
         var data = {'newGroupName': this.newGroupName};
		 if(this.newGroupName != null){
             this._groupService.createGroup(data).subscribe(
                 data => { 
                     console.log(data);
                     this.getGroups();
                 },
                 error => {
                     console.error(error);
                 }
             )
		 } else{
			 document.getElementById('gro').style.border = '2px solid #C70039';		 
			 var em = 'input is empty.';
             document.getElementById('error').innerHTML = '' + em + '';
		 }
     }
	 
	 public createChannel(event){
         event.preventDefault();
         var data = {'newChannelName': this.newGroupName};
		 if(this.newGroupName != null){
             this._groupService.createGroup(data).subscribe(
                 data => { 
                     console.log(data);
                     this.getGroups();
                 },
                 error => {
                     console.error(error);
                 }
             )
		 } else{
			 document.getElementById('cha').style.border = '2px solid #C70039';		 
			 var em = 'input is empty.';
             document.getElementById('error2').innerHTML = '' + em + '';
		 }
     }

     public deleteGroup(groupName){
         this._groupService.deleteGroup(groupName, this.user.username).subscribe(
             data =>{
                 this.getGroups();
             }, error =>{
                 console.error(error)
             }
		 )
     }

     public getGroups(){
         var data = {
             'username': JSON.parse(sessionStorage.getItem('user')).username
         }
         this._groupService.getGroups(data).subscribe(
             data =>{
             console.log('getGroups()');
             console.log(data);
             this.groups = data['groups'];
             }, 
             error => {
                 console.error(error);
             }
         )
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
     // Determine which group is currently selected and pass onto the child panel
     public openGroup(name){
         console.log(name);
         for(var i = 0; i < this.groups.length; i++){
             if(this.groups[i].name == name){
                 this.selectedGroup = this.groups[i];
             }
         }
         this.channels = this.selectedGroup.channels;
     }
     // Responsible for handling the event call by the child component
     public channelChangedHandler(name){
         var found:boolean = false;
         for(var i = 0; i < this.channels.length; i++){
             if(this.channels[i].name == name){
                 this.selectedChannel = this.channels[i];
                 found = true;
             }
         }
         return found;    
	 }
	 
     public getChannels(groupName){
         var channels = [];
         return channels;
     }
}
