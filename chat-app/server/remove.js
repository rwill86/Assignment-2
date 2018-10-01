module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;
     //Remove User from mongo database
     this.removeUser = function(id, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('users');
             var ObjectID = require('mongodb').ObjectID;
             var query = {_id: ObjectID(id)};       // user._id needs to be converted to an ObjectID
             console.log(query._id);
             dbo.collection('users').deleteOne(query, function(err, result){
                 if(err){
                     console.log('Error deleting user: ' + err);
                     res.send(false);
                 } else {
                     console.log('Deleted user: ' + id);
                     res.send(true);
                 }
             });
         });
     }
	 //Remove Group from mongo database
	 this.removeGroup = function(id, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('groups');
			 var query = {name: id}; 
             dbo.collection('groups').deleteOne(query, function(err, result){
                 if(err){
                     console.log('Error deleting group: ' + err);
                     res.send(false);
                 } else {
                     console.log('Deleted group: ' + id);
                     res.send(true);
                 }
             });
         });
     }	 
	 //Remove Channel from mongo database
	 this.removeChannel = function(id, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('channels');
			 var query = {name: id}; 
             dbo.collection('channels').deleteOne(query, function(err, result){
                 if(err){
                     console.log('Error deleting channel: ' + err);
                     res.send(false);
                 } else {
                     console.log('Deleted channel: ' + id);
                     res.send(true);
                 }
             });
         });
     }
     return this;
}
