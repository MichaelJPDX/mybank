const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { addAccount, getAccount, newTx, userLogin, listTx } = require('./databank');

var userAcct = false;
var exitBank = false;

app.get('/login', function(req, res){
    console.log("User login attempt: " + req.params.username);
    userAcct = userLogin({ username: req.params.username, password: req.params.password });
    if (!userAcct) {
        // return error response
        console.error("Failed login attempt");
    } else {
        console.info("Successful login");
        res.json(userAcct);
    }
});

app.listen(3000, () => console.log('Server started and listening on port 3000!'));