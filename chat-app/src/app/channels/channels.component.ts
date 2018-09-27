import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
     selector: 'app-channels',
     templateUrl: './channels.component.html',
     styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {
     @Input() channels;
     @Input() group;
     @Output() channelChanged: EventEmitter<string> = new EventEmitter();

     public constructor(){ 
	 }

     public ngOnInit(){
     }

     public changeChannel(name){
         this.channelChanged.emit(name);
     }
}
