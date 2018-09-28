module.exports = function(app, io){
	 console.log('Server Socket Initialised');
	 var clients = 0;
	 var room = 1;
	 //var users = [];
	 io.on('connection', (socket) => {
		 clients++;
		 console.log('user connection');
		 //lobby
		 socket.join('Lobby');
		 socket.username = 'anonymous';
		 io.sockets.emit('boardcast', {description: clients + ' clients connected!'});
		 //setUser
		 socket.on('setUser', function(data){		 
			 //if(users.indexOf(data) > -1){
				 //users.push(data);
		     console.log('Set user: ' + data);
				 //scoket.emit('userSet', {username: data});
		     socket.username = data;
			 //} else{
				 //socket.emit('userExists', data);
			 //}		 
		 });
		 //getUser
		 socket.on('getUser', function(data){
			 //socket.username = data;
		 });
		 //typing
		 socket.on('typing', function(data){
			 socket.boardcast.emit('typing', {username: socket.username});
		 });
		 //join room
		 socket.on('addRoom', function(data){
			 socket.join(data);
			 io.emit('join', data);			 
		 });
		 //leave room
		 socket.on('leaveRoom', function(data){
			 socket.leave(data);
			 io.emit('leave', data);		 
		 });
		 //error handeler
		 socket.on('error', function(err){
             console.log(err);
         });
		 //Add message to Channel
		 socket.on('addChannelMessage', function(data, msg){
			 //socket.broadcast.to(id).emit('my message', msg);
			 io.emit('message', {data, type:'message', text:message});
		 });	 
		 //Disconnect user
		 socket.on('disconnect', function(){
			 clients--;
			 io.sockets.emit('boardcast', {description: clients + ' clients disconnected!'});
			 console.log('user disconnect.');			
			 //socket.leave('lobby');
			 //socket.to('lobby').emit('user has disconnect.', socket.id);
		 }); 
         //Add image 
		 socket.on('addImage', function(data){
			 console.log('image send');
             io.emit('image', { image: true, buffer: data });		 
         });
		 //Add message
	     socket.on('addMessage', function(message){
			 console.log('message send');
			 var d = new Date();
		     var h = d.getHours();
		     var m = d.getMinutes();
			 var date = h + ':' + m;
		     io.emit('message', {type:'message', text:message, user:socket.username, date:date});
		 });
	 });
};