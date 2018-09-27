module.exports = function(app, io){
	 console.log('Server Socket Initialised');
	 var clients = 0;
	 var room = 1;
	 var users = [];
	 var messages = [];
	 io.on('connection', (socket) => {
		 clients++;
		 console.log('user connection');
		 //lobby
		 socket.join('Lobby');
		 io.sockets.emit('boardcast', {description: clients + ' clients connected!'});
		 //setUser
		 socket.on('setUser', function(data){
			 if(users.indexOf(data) > -1){
				 users.push(data);
				 scoket.emit('userSet', {username: data});
			 } else{
				 socket.emit('userExists', data);
			 }		 
		 });
		 //getUser
		 socket.on('getUser', function(){
			 io.emit('', users);
		 });
		 //join room
		 socket.on('room', function(data){
			 socket.join(data);
			 socket.to(data).emit('user joined - ' + data, socket.id);
			 
		 });
		 //fail connect
		 socket.on('connect_failed', function(){
             console.log('Sorry, there seems to be an issue with the connection!');
         });
		 //Channel message
		 socket.on('channel-message', function(id, msg){
			 socket.broadcast.to(id).emit('my message', msg);
		 });	 
		 //Disconnect user
		 socket.on('disconnect', function(){
			 clients--;
			 io.sockets.emit('boardcast', {description: clients + ' clients connected!'});
			 console.log('user disconnect.');			
			 //socket.leave('lobby');
			 //socket.to('lobby').emit('user has disconnect.', socket.id);
		 }); 
          
		 socket.on('addImage', function(data){
			 console.log('image send');
             io.emit('image', { image: true, buffer: data });		 
         });
		 //Add message
	     socket.on('addMessage', function(message){
			 console.log('message send');
		     io.emit('message', {type:'message', text:message});
		 });
	 });
};