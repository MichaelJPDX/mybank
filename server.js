const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());       // to support JSON-encoded bodies

const { addAccount, getAccount, newTx, userLogin, listTx } = require('./databank');

var userAcct = false;
var exitBank = false;

app.get("/", function(req,res) {
    res.sendFile( __dirname + '/index.html');
});

app.post('/login', function(req, res){
    console.log("User login attempt: " + req.body.username);
    userAcct = userLogin({ username: req.body.username, password: req.body.password });
    if (!userAcct) {
        // return error response
        console.error("Failed login attempt");
        res.status(500).send("Unable to login. Please check your user name and password.");
    } else {
        console.info("Successful login");
        res.json(userAcct);
    }
});

app.post('/adduser', function(req, res){
    console.log("Add user attempt: " + req.body.username);
    var addResult = addAccount({ name: req.body.name, username: req.body.username, password: req.body.password });
    if (!addResult) {
        // return error response
        console.error("Failed login attempt");
        res.status(500).send("Your user name already exists. Please try another.");
    } else {
        console.info("Successful login");
        res.json({ result: "OK" });
    }
});

app.post('/gettx', function(req, res){
    console.log("Getting transactions for account: " + req.body.account);
    var transactions = listTx(req.body.account);
                //console.log("data: " + JSON.stringify(transactions));
    res.json(transactions);
});

app.post('/addtrans', function(req, res){
    console.log("Adding new transation: " + req.body.account);
    var newbalance = newTx(req.body.account, req.body.transtype, req.body.txamount);
    if (newbalance < 0) {
        // tried to withdraw more than allowed
        res.status(500).send("You cannot withdraw more than you have on deposit.");
    } else {
        //console.log("data: " + JSON.stringify(transactions));
        var transactions = listTx(req.body.account);
        var resultset = { balance: newbalance, transactions: transactions };
        res.json(resultset);
    }
});

app.get(/^(.+)$/, function(req, res){ 
     //console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
});

app.listen(3000, () => console.log('Server started and listening on port 3000!'));