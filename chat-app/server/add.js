module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;
     
     this.addUser = function(user, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('users');            
             // Add User
             dbo.collection('users').insertOne(user, function(err, result) {
                 if (err){
					throw err;
				 }
                 console.log('Added new new: ' + user.username);
                 res.send(true);
                 db.close();
             });
         });
     }
     return this;
}