// ============================================
// This module handles the login according to
// the data that is presented.
// ============================================
module.exports = function(){
     this.data;
     this.findUser = function(username){
         var match = false;
         var users = data.users;
         for(var i = 0; i < users.length; i++){
             if(users[i].username == username){
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