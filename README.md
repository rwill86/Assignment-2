# Assignment-2
## Version
Version 0.2
## Description 
This is a chat application that allows the user to login and chat with other online-users.
## 	Install Instructions
How to Install
Start up command prompt ```git init```
Clone the git url ```git clone https://github.com/rwill86/Assignment-1.git``` the project is done installing.
Add NPM packages ```node npm i``` if needed.
## 	Run Instructions
How to Run
Enter ```ng build``` in command prompt to build the appilcation. This will create a ```/dist``` file.
Run the NODE.JS server ```node server.js``` and the Angular client ```ng serve``` . Navigate to url add ```http://localhost:3000``` and ```http://localhost:4200``` 
## Testing
To test the NODE.JS firstly install ```npm install mocha``` edit json file to add ```mocha``` then run the command ```npm test``` on server.
## Error Notes
## Author
Ritchie Wils, s2967766

##Documentation
##Git
myGit is an open source software which tracks changes witin files which is useful among multiple people doing coordinating work on one big development project.
GIT respositroy was create with a readme file with instruction of how to run,install and test with mocha in the appilcation.
Shortly after the respositroy was cloned to the local user side then started working  on the development progress.
Creating new and multiple branches for each fucntion then doing a checkout for different functions that there implement during the development with a few updates to previous functions that were added to the master branch.
Git was layout to be pushed to the origin master branch each day for consistency and to have a back up on the cloud service of myGit to keep the files organized if anything happened.
No errors or merge conflicts happened while pushing branches to the myGit.

##Data Structures
The data stuctures system is very important part of making this chat appilcation during delevopment so we know what system to work with.
Mongodb Database was chosen for this as it works well with NODE.JS to store the main data on the user-end side as it was easy and simple to implement and replace json data.
Mongodb was installed into the npm packages so NODE.JS could use the functionality of this database package.
The main data stucture had Users, Groups, chats and channels were created then stored into the mongodb Database with unique identification's with hashes to keep the information in safe hands. 
Additionally the Database stucture had functions which allowed the front-user to add, update, delete and much more while using Monogo.
Session and local storage properties were used to store the user information like identification allowing access to more options when the front-user login to the site.
These can be destroyed if the user leaves the site such as sessions or the user logout of the appilcation which will clear both data storages.
Arrays and Objects data were used in many parts in the site such as the user allowing more options with the other data structures. 

##Rest API
REST API is an internet protocol that allows the end-user to connection and transfer data across two ports backwards and forwards such as NODE.JS and Angular. 
API can do Get and Post Requests this is useful in creating API for User, Groups and Channels in the development. 
The User API had multiple functions such us adding, updating, finding and deleting showing the ability to quickly demonstrate the use of mongodb databases with API.
API update used the User's unique identification then was parse through the API post request handling the data into a fucntion which put that data into mongodb database.
The other Request is API Add  which creates a new user object that automatically is assigned with an unique identification made in mongodb then stored.
These functions were similarly done with with Channels and Groups API with mongodb database as the only thing that was different was dealing with members within the data structure in mongodb.

##Angular Architecture
The Angular architecture is quite an important part of the development as it communicates with the end-user from the client-side. 
Angular port of localhost:4200 during development testing and error were removed throught the development of chat appilcation. 
The User compontent was generated as hadn't been made yet. Angular system directly gives us the options to upload images dircely to server-side folder which gives the ability to update logos and send photos.
Main key items of the Angular framework was implementing the services on the client-user such as sockets, users, groups, and channels to communicate with HTTP cors letting communication with the server-side.
Socket services on Angular lets the flow of information on the subscriber and emits that data to do different functions as simple as pushing new messages to the Chat component displaying those messages.
Data binding is important to displaying informationand on the HTML but also hiding the data from the end-user. 
Finally Designing the Angular to be clean and user-friendly so anyone could use it without confusion thus it was made it more user-friendly to any user using this application.

