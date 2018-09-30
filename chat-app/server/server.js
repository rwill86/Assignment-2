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
// Group Module
const groups = require('./groups.js')();

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
		 
		 var udata = [
             { username: 'Ritchie', password: 'pass', userLogo:'logo1.PNG', permissions:2 },
             { username: 'super', password: 'super', userLogo:'logo1.PNG', permissions:2 },
             { username: 'group', password: 'group', userLogo:'logo2.PNG', permissions:1 },
             { username: 'Jim', password: '2', userLogo:'logo2.PNG', permissions:0 },
			 { username: 'Mary', password: '1', userLogo:'logo2.PNG', permissions:0 }
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
		 'userLogo': 'logo1.PNG',
		 'permissions': 0
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
	 console.log('u: ' + username  + ' p: ' + password);
     var match = login.getLogin(username, password, res);
     //fs.readFile(dataFile, dataFormat, function(err, data){
		 //data = JSON.parse(data);
	     //if(match !== null){
		     //groups.data = data;
	         //match.groups = groups.getGroups(username, 2);
	     //}	
     //});	 
});
// Group APIs
app.post('/api/groups', function(req, res){
     // We want to authenticate again -- usually you'd use a token
     //fs.readFile(dataFile, dataFormat, function(err, data){
         //data = JSON.parse(data);
         //var username = req.body.username; 
         //login.data = data;
         //let match = login.findUser(username);    
         // Check to see if we got a match, get groups if true
         //if(match !== false){
             //groups.data = data;
             //match.groups = groups.getGroups(username, match.permissions);
         //}
         //res.send(match);
     //});
	 fs.readFile(dataFile, dataFormat, function(err, data){
		 data = JSON.parse(data);
	     var loginn = require('./login.js')(MongoClient, dbURL);
	     var username = req.body.username;
         var password = req.body.password;	
	     console.log('u: ' + username  + ' p: ' + password);
         let match = loginn.getLogin(username, password, res);
	     console.log('Object' + match);
	     if(match !== null){
		     console.log('testing');
		     groups.data = match;
	         match.groups = groups.getGroups(username, match.permissions);
	     }	
     });	 
});

app.delete('/api/group/delete/:groupname', function(req, res){
     var groupName = req.params.groupname;
     // Read the JSON file to get the current data
     fs.readFile(dataFile, dataFormat, function(err, data){
         var readData = JSON.parse(data);
         groups.data = readData.groups;
         readData.groups = groups.deleteGroup(groupName);
         console.log(readData);
         var json = JSON.stringify(readData);
         // Write the updated data to JSON
         fs.writeFile(dataFile, json, dataFormat, function(err, d){
             res.send(true);
             console.log('Deleted group: ' + groupName);
         });
     });
});

app.post('/api/group/create', function(req, res){
     var groupName = req.body.newGroupName
     if(groupName == '' || groupName == 'undefined' || groupName == null){
         res.send(false);
     } else {
        // Read the JSON file to get an updated list of groups
        fs.readFile(dataFile, dataFormat, function(err, data){
             var readData = JSON.parse(data);
             var g = readData.groups;    
             var newGroup = {
                 'name': req.body.newGroupName,
                 'admins':[],
                 'members':[]
             }
             g.push(newGroup);
             readData.groups = g;
             var json = JSON.stringify(readData);      
             // Write the updated data to the JSON file.
             fs.writeFile(dataFile, json, dataFormat, function(err, data){
                 res.send(true);
                 console.log('Created new group: ' + req.body.newGroupName);
             });
         });
     }
})
 
