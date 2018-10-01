//Testing with mocha
const express = require('express');
var assert = require('assert');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017/users';
//Test functions
var reader = require('./read.js')(MongoClient, dbURL);
var writer = require('./add.js')(MongoClient, dbURL);
var updater = require('./update.js')(MongoClient, dbURL);
var login = require('./login.js')(MongoClient, dbURL);
var deleter = require('./remove.js')(MongoClient, dbURL);

describe('Alway true test', function(){
     it('should always equal true 1 = 1', function(){
	     assert.equal(1, 1);
	 });
});
	 
describe('Add User to mongo', function(res){
	 it('Added user to database', function(res){
		 var newUser = {
             'username': 'Vince',
             'password': 'wwf',
		     'email': 'vince@Gmail.com',
		     'userLogo': 'logo1.PNG',
		     'permissions': 1
         }
	     assert.equal(writer.addUser(newUser, res), true);
	 });
});

describe('Update User', function(res){
	 it('Updated user from database', function(res){
	     assert.equal(updater.updateUser('', res), true);
	 });
});

describe('Delete User', function(res){
	 it('Delete user from database', function(res){
	     assert.equal(deleter.removeUser('id', res), true);
	 });
});

describe('Login fucntion is succussful', function(res){
	 it('User is found', function(res){
	     assert.equal(login.getLogin('Ritchie', 'pass', res), true);
	 });
});

describe('Username is empty', function(res){
	 it('passsword = "pass" and username = null', function(res){
	     assert.equal(login.getLogin(null, 'pass', res), true);
	 });
});

describe('Password is empty', function(res){
	 it('passsword = null and username = "Ritchie"', function(res){
	     assert.equal(login.getLogin('Ritchie', null, res), false);
	 });
});

describe('Username and Password are empty', function(res){
	 it('password = null and username = null', function(res){
	     assert.equal(login.getLogin(null, null, res), false);
	 });
});

describe('Tesing input in Login fucntion', function(res){
	 it('password = abc and username = abc', function(res){
	     assert.equal(login.getLogin('abc', 'abc', res), false);
	 });
});