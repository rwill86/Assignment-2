module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;
     //Update user by id
     this.updateUser = function(user, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('users');
             var ObjectID = require('mongodb').ObjectID;
             var query = {_id: ObjectID(user._id)};       // user._id needs to be converted to an ObjectID
             var newValues = {
                 $set: {
                     username: user.username,
                     password: user.password,
					 email: user.email,
					 userLogo: user.userLogo
                 }
             }
             dbo.collection('users').update(query, newValues, function(err, result){
                 console.log('update user');
                 if(err){
                     console.log('Error updating user: ' + err);
                 } else{
                     console.log('Updated user: ' + user.username);
					 res.send(true);
                 }
             });
         });
     }
	 //Update channel by id
	 this.updateChannel = function(channel, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('channels');
             var ObjectID = require('mongodb').ObjectID;
             var query = {_id: ObjectID(channel._id)};       // user._id needs to be converted to an ObjectID
             var newValues = {
                 $set: {
                     members: channel.members
                 }
             }
             dbo.collection('channels').update(query, newValues, function(err, result){
                 console.log('update channel');
                 if(err){
                     console.log('Error updating channel: ' + err);
                 } else{
                     console.log('Updated channel: ' + channel.name);
					 res.send(true);
                 }
             });
         });
     }
     return this;
}
