module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;
      //Add a User to mongo function
     this.addUser = function(user, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('users');            
             //Add User
             dbo.collection('users').insertOne(user, function(err, result) {
                 if(err){
					throw err;
				 }
                 console.log('Added new user: ' + user.username);
                 res.send(true);
                 db.close();
             });
         });
     }
	 //Add a Group to mongo function
	 this.addGroup = function(group, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('groups');            
             //Add Groups
             dbo.collection('groups').insertOne(group, function(err, result) {
                 if(err){
					throw err;
				 }
                 console.log('Added new group: ' + group.name);
                 res.send(true);
                 db.close();
             });
         });
     }	 
	 //Add a Channel to mongo function
	 this.addChannel = function(channel, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('channels');            
             //Add Groups
             dbo.collection('channels').insertOne(channel, function(err, result) {
                 if(err){
					throw err;
				 }
                 console.log('Added new channel: ' + channel.name);
                 res.send(true);
                 db.close();
             });
         });
     }
     return this;
}