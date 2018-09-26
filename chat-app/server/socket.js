module.exports = function(app, io){
	 console.log('Server Socket Initialised');
	 io.on('connection', (socket) => {
		 console.log('user connection');
		 //lobby
		 socket.join('Lobby');
		 //join room
		 socket.on('room', function(data){
			 socket.join(data);
			 socket.to(data).emit('user joined - ' + data, socket.id);
			 
		 });
		 //Channel message
		 socket.on('channel-message', function(id, msg){
			 socket.broadcast.to(id).emit('my message', msg);
		 });	 
		 //Disconnect user
		 socket.on('disconnect', function(){
			 console.log('user disconnect.');			
			 //socket.leave('lobby');
			 //socket.to('lobby').emit('user has disconnect.', socket.id);
		 });      
		 //Add message
	     socket.on('add-message', (message) => {
			 console.log('message send');
		     io.emit('message', {type:'message', text:message});
		 });
	 });
};