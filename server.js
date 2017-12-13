const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { addAccount, getAccount, newTx, userLogin, listTx } = require('./databank');

var userAcct = false;
var exitBank = false;

app.post('/login', function(req, res){
    console.log("User login attempt: " + req.body.username);
    userAcct = userLogin({ username: req.body.username, password: req.body.password });
    if (!userAcct) {
        // return error response
        console.error("Failed login attempt");
    } else {
        console.info("Successfule login");
        res.send(userAcct);
    }
});

app.listen(3000, () => console.log('Server started and listening on port 3000!'))