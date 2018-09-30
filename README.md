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
To test the NODE.JS firstly install ```npm install mocha``` then run the command ```npm test``` on server.
## Error Notes
## Author
Ritchie Wils, s2967766

##Documentation
##Git
myGit is an open source software which tracks changes witin files which is useful among multiple people doing coordinating work on one big development project.
GIT respositroy was create with a readme with instruction of how to run and install the appilcation.
Shortly after the respositroy cloned to the local user side it started working  then development began.
Creating new branches then doing a checkout for different functions that there implement during the development with a few updates to previous functions there added to the master branch.
Git was layout to be pushed to the origin master branch each day for consistency and to have a back up on the cloud service of myGit to keep the files organized.
No errors or merge conflicts happened while pushing branches to the myGit.

##Data Structures
The data stuctures system is very important part of making this chat appilcation during delevopment.
Mongo Database was chosen for this as it works well with NODE.JS to store the main data on the user-end side as it was easy and simple to implement.
Mongo was installed into the npm packages and the json files so NODE.JS could use the functions of the package.
This stucture for the User, Groups, and channels were created then stored into the Mongo Database with unique identification's with hashes to keep the information safe hands. 
Additionally the Database stucture had function which allowed the front-user to add, update, delete and must more with Monogo.
Session and local storage properties were used to store the user information like identification allowing access to more options.
These can be destroyed if the user leaves the webpage such as sessions or the user logout of the appilcation which will clear both storages.

##Rest API
REST API is an internet protocol that allows the end-user to connection and transfer data across two ports backwards and forwards. 
API can do Get and Post Requests this was useful in creating API for User, Groups and Channels. 
The User API had multiple functions such us adding, updating, get and delete allowed the ability to quickly demonstrate the use of mongo databases.
API Update used the User's unique identification parsing that through the API post request handling the data putting it into mongodb database.
API Add creating a new user that atuomatically as an unique identification made in mongo then stored into the database.

##Angular Architecture
The Angular architecture is quite an important part of the development as it communicates with the end-user from the client-side. Next the User compentent was generated to give more options to the client-user such as uploading images to update items like users logo.
The many key items of the Angular framework was implementing one of them was the services on the client-user with sockets, user, groups, and channels to communicate with HTTP cors.
Socket services allows the flow of information on the subscriber and emits of the socket to do different function as simple as pushing new messages to the chat component page displaying those messages.
Data binding is important to display information from the end-user to the HTML layout page with using HTTP to grab data to different varibles. 
Designing the Angular to be clean and simple so anyone could use it thus it was made be user-friendly to any client-user at any age range.

