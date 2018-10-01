const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express(); 
const fs = require('fs')
const http = require('http').Server(app);;
const dataFile = './data.json';
const formidable = require('formidable');
const io = require('socket.io')(http);
const dataFormat = 'utf8';
// Mongo DataBase
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/users';
const verbose = false;
// CORS
// We are enabling CORS so that our 'ng serve' Angular server can still access
// our Node server. 
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use(cors(corsOptions))
// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Basic Routes
app.use(express.static(path.join(__dirname, '../dist/chat-app')));
app.use('/images', express.static(path.join(__dirname, './userimages')));
require('./listen.js')(http);
require('./socket.js')(app, io);
require('./upload.js')(app, formidable);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'))
});

app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'))
});

app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'))
});

app.get('/user', function(req,res){
    res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'))
});
//Mongo Databease 
app.get('/db/install', function(req, res){
	 console.log('Setting up initial db state');
     MongoClient.connect(dbURL, function(err, db){
         if(err){
			throw err;
		 }
         console.log('SUCCESS: connected to db');
         var dbo = db.db('users');
		 var dboc = db.db('channels');
		 var dbog = db.db('groups');
		 var dbochat = db.db('chats');

         // Drop collection
         dbo.collection('users').drop(function(err, delOk){
             if(err){
                 console.log('ERROR: failed drop collection users');
                 if(verbose){
					 console.log(err)
				 } 
             };
             if(delOk){
				 console.log('SUCCESS: dropped collection users');
			 }
         });
		 
		 dboc.collection('channels').drop(function(err, delOk){
             if(err){
                 console.log('ERROR: failed drop collection channels');
                 if(verbose){
					 console.log(err);
				 } 
             };
             if(delOk){
				 console.log('SUCCESS: dropped collection channels');
			 }
         });
		 
		 dbog.collection('groups').drop(function(err, delOk){
             if(err){
                 console.log('ERROR: failed drop collection groups');
                 if(verbose){
					 console.log(err);
				 } 
             };
             if(delOk){
				 console.log('SUCCESS: dropped collection groups');
			 }
         });
		 
		 dbochat.collection('chats').drop(function(err, delOk){
             if(err){
                 console.log('ERROR: failed drop collection chats');
                 if(verbose){
					 console.log(err);
				 } 
             };
             if(delOk){
				 console.log('SUCCESS: dropped collection chats');
			 }
         });
		 
		 var udata = [
             { username: 'Ritchie', email: 'ritchie@Gmail.com', password: 'pass', userLogo:'logo1.PNG', permissions:2 },
             { username: 'super', email: 'super@Gmail.com', password: 'super', userLogo:'logo1.PNG', permissions:2 },
             { username: 'group', email: 'group@Gmail.com', password: 'group', userLogo:'logo2.PNG', permissions:1 },
             { username: 'Joe', email: 'rogan@Gmail.com', password: '2', userLogo:'logo2.PNG', permissions:0 },
			 { username: 'Alex', email: 'jones@infowars.com', password: '1', userLogo:'logo2.PNG', permissions:0 }
         ];
		 
		 var cdata = [
             { name: 'Events', group: 'Griffith Innovate', members: ['Ritchie','Mary','group'] },
             { name: 'Admin Chat', group: 'Griffith Innovate', members: ['Ritchie'] },
             { name: 'Lab Help', group: '2811ICT', members: ['Ritchie','Mary','Jim'] },
             { name: 'Assignment Help', group: '2811ICT', members:['Mary','Jim'] }
         ];
		 
		 var gdata = [
             { name: 'Griffith Innovate', admins: ['Ritchie'], members: ['Ritchie','Mary','group'] },
             { name: '2811ICT', admins: ['super'], members: ['Ritchie','Jim'] },
             { name: '1701ICT', admins: ['group'], members: ['Mary'] }
         ];
		 
		  var chatdata = [
             { channel: 'Events', text: 'Hello', user: 'Ritchie', image: '', date: '12:00' },
             { channel: 'Events', text: 'bye', user: 'super', image: '', date: '01:15' },
             { channel: 'Lab Help', text: 'Welcome', user: 'group', image: '', date: '08:30' }
         ];
		 
         dbo.collection('users').insertMany(udata, function(err, res){
             if(err){
				 throw err;
			 }
             console.log('Inserted ' + res.insertedCount + ' documents to users');
         });
		 
		 dbog.collection('groups').insertMany(gdata, function(err, res){
             if(err){
				 throw err;
			 }
             console.log('Inserted ' + res.insertedCount + ' documents to groups');
         });
		 
		 dboc.collection('channels').insertMany(cdata, function(err, res){
             if(err){
				 throw err;
			 }
             console.log('Inserted ' + res.insertedCount + ' documents to channels');
         });
		 
		 dbochat.collection('chatss').insertMany(chatdata, function(err, res){
             if(err){
				 throw err;
			 }
             console.log('Inserted ' + res.insertedCount + ' documents to chats');
         });
		 
		 dbo.collection('users').find({}).toArray(function(err, result){
             if(err){
				 throw err;
			 }
             console.log(result);
             db.close();
         });
         db.close();
	 });
});
// User API
app.get('/api/users', function (req, res){
     var reader = require('./read.js')(MongoClient, dbURL);
     reader.getUsers(res);
});

app.post('/api/user', function (req, res) {
     var writer = require('./add.js')(MongoClient, dbURL);
     var newUser = {
         'username': req.body.username,
         'password': req.body.password,
		 'email': req.body.email,
		 'userLogo': 'logo1.PNG',
		 'permissions': 1
     }
     writer.addUser(newUser, res);
});

app.put('/api/user/:id', function (req, res){
     console.log('update user');
     var updater = require('./update.js')(MongoClient, dbURL);
     updater.updateUser(req.body, res);
});

app.delete('/api/user/:id', function (req, res){
     console.log('delete user: ' + req.params.id);
     var deleter = require('./remove.js')(MongoClient, dbURL);
     deleter.removeUser(req.params.id, res);
});
// Login
app.post('/api/login', function(req, res){
	 var login = require('./login.js')(MongoClient, dbURL);
	 var username = req.body.username;
     var password = req.body.password;	
	 console.log('username: ' + username  + ' password: ' + password);
     login.getLogin(username, password, res);
});
// Group APIs
app.post('/api/groups', function(req, res){
     // We want to authenticate again -- usually you'd use a token
	 var reader = require('./read.js')(MongoClient, dbURL);
     reader.getGroups(res);
	 console.log('Got Groups.');
});

app.delete('/api/group/delete/:groupname', function(req, res){
     var groupName = req.params.groupname;
     var deleter = require('./remove.js')(MongoClient, dbURL);
     deleter.removeGroup(groupName, res);
     console.log('Deleted group: ' + groupName);
});

app.post('/api/group/create', function(req, res){
     var groupName = req.body.newGroupName;
	 var writer = require('./add.js')(MongoClient, dbURL);
     var newGroup = {
         'name': groupName,
         'admins':[],
         'members':[]
     }
	 writer.addGroup(newGroup, res);
     console.log('Created new group: ' + req.body.newGroupName);
});
// Channel APIs
app.post('/api/channels', function(req, res){
	 var groupname = req.body.groupname;
	 var reader = require('./read.js')(MongoClient, dbURL);
     reader.getChannels(groupname, res);
	 console.log('Got channels.');
});

app.delete('/api/channel/delete/:channelname', function(req, res){
     var channelName = req.params.groupname;
     var deleter = require('./remove.js')(MongoClient, dbURL);
     deleter.removeChannel(channelName, res);
     console.log('Deleted channel: ' + channelName);
});

app.post('/api/channel/create', function(req, res){
     var channelName = req.body.newChannelName;
	 var groupName = req.body.group;
	 var writer = require('./add.js')(MongoClient, dbURL);
     var newChannel = {
         'name': channelName,
         'group': groupName,
         'members':[]
     }
	 writer.addChannel(newChannel, res);
     console.log('Created new channel: ' + channelName);
});

app.put('/api/channel/:channel', function (req, res){
     console.log('update Channel');
     var updater = require('./update.js')(MongoClient, dbURL);
     updater.updateChannel(req.body, res);
});
//Chat API
app.post('/api/chats', function(req, res){
});

app.post('/api/chats/create', function(req, res){
});

app.post('/api/chats/image', function(req, res){
});
