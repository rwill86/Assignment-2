module.exports = function(MongoClient, dbURL){
     this.MongoClient = MongoClient;
     this.dbURL = dbURL;

     this.removeUser = function(id, res){
         this.MongoClient.connect(this.dbURL, function(err, db){
             if(err){
				 throw err;
			 }
             var dbo = db.db('users');
             var ObjectID = require('mongodb').ObjectID;
             // console.log(id);
             var query = {_id: ObjectID(id)};       // user._id needs to be converted to an ObjectID
             console.log(query._id);
             dbo.collection('students').deleteOne(query, function(err, result){
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
     return this;
}
