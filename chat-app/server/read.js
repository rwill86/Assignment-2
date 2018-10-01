module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;
     //Read all Users in the database
     this.getUsers = function(res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
             }
             var dbo = db.db('users');
			 dbo.collection('users').find({}).toArray(function(err, result){
                 if(err){
				     throw err;
			     }
                 res.send(result);
                 db.close();
             });
         });
     }
	 //Read all Groups in the database
	 this.getGroups = function(res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
             }
             var dbo = db.db('groups');
			 dbo.collection('groups').find({}).toArray(function(err, result){
                 if(err){
				     throw err;
			     }
                 res.send(result);
                 db.close();
             });
         });
     }	 
	 //Read Channels in the database
	 this.getChannels = function(grp, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
             }
             var dbo = db.db('channels');
			 dbo.collection('channels').find({group: grp}).toArray(function(err, result){
                 if(err){
				     throw err;
			     }
                 res.send(result);
                 db.close();
             });
         });
     }
     return this;
}
