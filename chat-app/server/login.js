// ============================================
// This module handles the login according to
// the data that is presented.
// ============================================
//module.exports = function(MongoClient, dbURL){	
	 //this.MongoClient = MongoClient;
     //this.dbURL = dbURL;
	 //var match = false;
	 //this.getLogin = function(password, username, res){
         //this.MongoClient.connect(this.dbURL, function(err, db){
             //if(err){
				 //throw err;
             //}
	 	     //var dbo = db.db('users');
		     //dbo.collection('users').findOne({'username': username, 'password': password}, function(err, result){
			     //if(err){
				     //throw err;
                 //}
				 //match = results;
			     //res.send(result);
                 //db.close();
		     //});
         //});
		 //return match;
     //}
     //return this;
//}	 
	 
module.exports = function(){	
     this.data;
     this.findUser = function(username, password){
         var match = false;
         var users = data.users;
         for(var i = 0; i < users.length; i++){
             if(users[i].username == username && users[i].password == password){
                 match = users[i];
             }
         }
         return match;
     }

     this.setUserData = function(data){
         this.data = data;
     }
     return this;
}