module.exports = function(app, io){
	 console.log('Server Socket Initialised');
	 var clients = 0;
	 var room = 1;
	 io.on('connection', (socket) => {
		 //lobby
		 clients++;
		 console.log('user connection');	 
		 socket.join('Lobby');
		 socket.username = 'anonymous';
		 //setUser
		 socket.on('setUser', function(data){		 
		     console.log('Set user: ' + data);
		     socket.username = data; 
		 });
		 //typing
		 socket.on('typing', function(data){
			 socket.broadcast.to(data).emit('typing', {username: socket.username});
		 });
		 //join room
		 socket.on('addRoom', function(data){
			 socket.join(data);	
             var string = ' Joined ' + data;		
             var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;			 
             socket.broadcast.to(data).emit('message', {type:'message', id:data, text:string, user:socket.username, image:null, date:date});
             console.log('Joined channel ' + data);	
             room++;			 
		 });
		 //leave room
		 socket.on('leaveRoom', function(data){
			 socket.leave(data);
			 var string = ' left ' + data;
			 var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;
             socket.broadcast.to(data).emit('message', {type:'message', id:data, text:string, user:socket.username, image:null, date:date});	
             console.log('Left channel ' + data);	
             room--;			 
		 });
		 //error handeler
		 socket.on('error', function(err){
             console.log(err);
         });	 
		 //Disconnect user
		 socket.on('disconnect', function(){
			 clients--;
			 console.log(socket.username + 'has disconnect.');			
			 socket.leave('Lobby');
			 var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;
			 socket.broadcast.to('Lobby').emit('message', {type:'message', id:'lobby', text:' has disconnect.', user:socket.username, image:null, date:date});
		 }); 
         //Add image 
		 socket.on('addImage', function(data, id){
			 console.log('image send');
			 var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;
		     socket.broadcast.to(id).emit('message', {type:'message', id:id, text:data, user:socket.username, image:data, date:date}); 
         });
		 //Add message
	     socket.on('addMessage', function(message, id){
			 console.log('message send');
			 var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;
		     socket.broadcast.to(id).emit('message', {type:'message', id:id, text:message, user:socket.username, image:null, date:date});
		 });
	 });
};