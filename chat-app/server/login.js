// ============================================
// This module handles the login according to
// the data that is presented.
// ============================================
module.exports = function(MongoClient, dbURL){	
	 this.MongoClient = MongoClient;
     this.dbURL = dbURL;
	 this.getLogin = function(usern, pass, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
             }
	 	     var dbo = db.db('users');
		     dbo.collection('users').findOne({username: usern, password: pass}, function(err, result){
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