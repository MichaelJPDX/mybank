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
    } else {
        console.info("Successful login");
        res.json(userAcct);
    }
});

 app.get(/^(.+)$/, function(req, res){ 
     //console.log('static file request : ' + req.params);
     res.sendFile( __dirname + req.params[0]); 
 });

app.listen(3000, () => console.log('Server started and listening on port 3000!'));