import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
     selector: 'app-channels',
     templateUrl: './channels.component.html',
     styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit{
     @Input() channels;
     @Input() group;
     @Output() channelChanged: EventEmitter<string> = new EventEmitter();
	 @Output() leaveChanged: EventEmitter<string> = new EventEmitter();
	 
     public constructor(){ 
	 }

     public ngOnInit(){
	 
     }	 
     //Change Channel
     public changeChannel(name){
         this.channelChanged.emit(name);		 
     }	 
	 //exit Channel
     public exitChannel(name){
         this.leaveChanged.emit(name);		 
     }
}
