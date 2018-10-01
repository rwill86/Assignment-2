import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../group/group.service';
import { ChannelsService } from '../channels/channels.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
     public user;
     public selectedGroup;
     public selectedChannel;
     public groups;
     public channels;
     public newGroupName:String;
	 public newChannelName:String;

     public constructor(private router: Router, private _groupService:GroupService, private _channelService:ChannelsService, private sockServ:SocketService){
	 }

     public ngOnInit(){
         if(sessionStorage.getItem('user') === null){
             if(localStorage.getItem('user') !== null){
			     //local storage
			     var user = JSON.parse(localStorage.getItem('user'));
				 sessionStorage.setItem('user', user);
                 this.user = user;
                 console.log(this.user);
				 this.getGroups();
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
			 this.getGroups();
         }		 
     }
     //Create group
     public createGroup(event){
         event.preventDefault();
		 if(this.newGroupName != null){
			 var data = {'newGroupName': this.newGroupName};
             this._groupService.createGroup(data).subscribe(
                 data => { 
                     console.log(data);
					 this.newGroupName = '';
					 document.getElementById('gro').style.border = '';	
					 document.getElementById('error').innerHTML = '';
                     this.getGroups();
					 return true;
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
     //Delete Group
     public deleteGroup(groupName){
         this._groupService.deleteGroup(groupName, this.user.username).subscribe(
             data =>{
                 this.getGroups();
				 return true;
             }, error =>{
                 console.error(error);
             }
		 )
     }
     //Get Group
     public getGroups(){
         var u = {
             'username': JSON.parse(sessionStorage.getItem('user')).username
         }
         this._groupService.getGroups(u).subscribe(
             data =>{
                 console.log('getGroups()');
                 console.log(data);
                 this.groups = data;
				 return true;
             }, 
             error => {
                 console.error(error);
             }
         )
     }
	 //Get Channels
	 public getChannels(){
         var u = {
             'username': JSON.parse(sessionStorage.getItem('user')).username,
			 'groupname': this.selectedGroup.name
         }
         this._channelService.getChannels(u).subscribe(
             data =>{
                 console.log('getChannels()');
                 console.log(data);
                 this.channels = data;
				 return true;
             }, 
             error => {
                 console.error(error);
             }
         )
     }
	 //Create Channel
	 public createChannel(event){
         event.preventDefault();        
		 if(this.newChannelName != null){
			 var data = {'newChannelName': this.newChannelName, 'group': this.selectedGroup.name};
             this._channelService.createChannel(data).subscribe(
                 data => { 
                     console.log(data);
					 this.newChannelName = '';
					 document.getElementById('cha').style.border = '';	
					 document.getElementById('error2').innerHTML = '';
                     this.getChannels();
					 return true;
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
	 //update Channel
	 public updateChannel(channel, member){
		 var newmember = [];
		 for(var i = 0; i < channel.members.length; i++){
			 if(channel.members[i] != member){
				 newmember.push(channel.members[i]);
			 }
		 }
		 var newchannel = {
			 _id: channel._id,
			 name: channel.name,
             group: channel.group,
             members: newmember
		 }
		 this._channelService.updateMembers(newchannel).subscribe(
             data => {
                 this.getChannels();
				 return true;
             },
             error =>{
                 console.error('Error saving channel');
             }
         )
	 }
	 //Delete Channel
     public deleteChannel(channelName){
         this._channelService.deleteChannel(channelName, this.user.username).subscribe(
             data =>{
                 this.getChannels();
				 return true;
             }, error =>{
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
	 //route to user component 
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
		 //get channels
		 this.getChannels(); 
     }
     // Responsible for handling the event call by the child component
     public channelChangedHandler(name){
         var found:boolean = false;
		 if(this.selectedChannel != null){
			 //leave channel
			 console.log('Left channel');
		     this.sockServ.leaveRoom(this.selectedChannel.name);
         }		 
         for(var i = 0; i < this.channels.length; i++){
             if(this.channels[i].name == name){
				 //Join channel
				 console.log('Joined channel');
                 this.selectedChannel = this.channels[i];				 
				 this.sockServ.joinRoom(name);				 
                 found = true;
             }
         }
         return found;    
	 }
	 
	 public leaveChangedHandler(name){
		 if(this.selectedChannel != null){
			 //leave channel
			 console.log('Left channel');
		     this.sockServ.leaveRoom(this.selectedChannel.name);
			 this.selectedChannel == null;
         }		 
	 }
}
