import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketService } from '../socket/socket.service';

@Component({
     selector: 'app-channels',
     templateUrl: './channels.component.html',
     styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
     @Input() channels;
     @Input() group;
     @Output() channelChanged: EventEmitter<string> = new EventEmitter();

     public constructor(private sockServ:SocketService){ 
	 }

     public ngOnInit(){
     }	 

     public changeChannel(name){
         this.channelChanged.emit(name);
		 this.sockServ.joinRoom(name);	    
     }
}
