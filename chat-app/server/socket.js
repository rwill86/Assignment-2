module.exports = function(app, io){
	 console.log('Server Socket Initialised');
	 io.on('connection', (socket) => {
		 console.log('user connection');
		 socket.join('Lobby');
		 //Disconnect user
		 socket.on('disconnect', function(){
			 console.log('user disconnect');			
			 //io.sockets.emit('updateUser', usernames);
			 //socket.broadcast.emit('Lobby', username + 'has disconnect');
			 //socket.boardcast.emit('updateChat', 'Server', socket.username + ' has disconnect');
			 //socket.leave(socket.room);
		 });      
		 //Add room/channel
		 socket.on('add-room', function(data){
			 console.log('Added room');
			 //socket.push(data);
			 //socket.emit('updateChat', roomName, socket.room);
		 });
		 //remove room/channel
		 socket.on('remove-room', function(data){
			 console.log('Remove room');
			 //socket.push(data);
			 //socket.emit('updateChat', roomName, socket.room);
		 });
		 //Add user
		 socket.on('add-user', function(username){
			 console.log('Added user');
			 //socket.join('room' + ID, () => {
				 //io.to('room' + ID, username + 'Has joined the room');
			 //});
			 //socket.username = username;
			 //socket.room = 'lobby';
			 //usernames[username] = username;
			 //socket.join('lobby');
			 //socket.emit('updateChat', 'Server', 'You are online.');
			 //socket.broadcast.to('lobby').emit('updateChat', 'Server', username + ' has connected.');
			 //socket.emit('updateRoom', roomName, socket.room);
		  });
		 //Remove user
		 socket.on('remove-user', function(username){	
		     console.log('removing user');
             //socket.disconnect(true);		 
             //socket.broadcast.emit('Lobby', username + 'has disconnect');
		  });
		 //Add message
	     socket.on('add-message', (message) => {
			 console.log('message send');
		     io.emit('message', {type:'message', text:message});
		 });
	 });
};