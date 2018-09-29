module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;

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

    return this;
}
