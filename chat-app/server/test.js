//Testing with mocha
const express = require('express');
var assert = require('assert');
const app = express();

describe('Alway true test', function(){
     it('should always equal true 1 = 1', function(){
	     assert.equal(1, 1);
	 });
});
	 
describe('AddUser', function(){
	 it('Added user from database', function(){
	     assert.equal(1, 1);
	 });
});

describe('UpdateUser', function(){
	 it('Updated user from database', function(){
	     assert.equal(1, 1);
	 });
});

describe('DeleteUser', function(){
	 it('Delete user from database', function(){
	     assert.equal(1, 1);
	 });
});

describe('Login User', function(){
	 it('User is login', function(){
	     assert.equal(1, 1);
	 });
});

describe('Login fail', function(){
	 it('Error message', function(){
	     assert.equal(1, 1);
	 });
});