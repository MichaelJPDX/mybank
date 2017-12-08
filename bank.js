/*
**  Code challenge initial code
*/
var EventEmitter = require('events');
var prompt = new EventEmitter();
var current = null;
var result = {};
process.stdin.resume();

/*
logged in?
N - login / new acct
deposit
withdraw
balance
trans. history
logout
*/

/*  Data structures  */
/*
acounts/logins
var accounts = [{id: 1, name: 'Michael', username: 'michaelBKK', password: '12345', balance: 1000000}];
transactions
var trans = [{acct: 1, type: 'D', date: '2017-12-08 15:11', amount: 1000000}];
*/

process.stdin.on('data', function(data){
  prompt.emit(current, data.toString().trim());
});

prompt.on(':new', function(name, question){
  current = name;
  console.log(question);
  process.stdout.write('> ');
});

prompt.on(':end', function(){
  console.log('\n', result);
  process.stdin.pause();
});

prompt.emit(':new', 'name', 'What is your name?');

prompt.on('name', function(data){
  result.name = data;
  prompt.emit(':new', 'hobbies', 'What are your hobbies?');
});

prompt.on('hobbies', function(data){
  result.hobbies = data.split(/,\s?/);
  prompt.emit(':new', 'username', 'What is your username?');
});

prompt.on('username', function(data){
  result.username = data;
  prompt.emit(':end');
});