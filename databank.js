/*
**  Data structures and maintenance
**
*   These structures would normally be empty, but I've added some data for testing
*/
var accounts = [{id: '1', name: 'Michael', username: 'michael', password: '12345', balance: 1000000}];

/*
* Add a new account, what conditioning required?
*/
addAccount = function(acctInfo){
    //  Using the accounts array length as the ID for new accounts is a "cheat" but works for now
    var newAcct = {id: (accounts.length + 1), 
                   name: acctInfo.name, 
                   username: acctInfo.username.toLowerCase(), 
                   password: acctInfo.password, balance: 0};
    accounts.push(newAcct);
    console.info("Added account for " + acctInfo.name);
}
getAccount = function(key){
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].id === key) { return accounts[i]; }
    }
}

userLogin = function(userData){
    testUser = userData.username.toLowerCase();
    for (var i = 0; i < accounts.length; i++) {
        //console.info("Checking acct user " + accounts[i].username);
        if (accounts[i].username === testUser) {
            if (accounts[i].password === userData.password) {
                return accounts[i]; 
            }
        }
    }
    console.error("Sorry, cannot find your login info.")
    return false;
}

var trans = [{acct: 1, type: 'D', date: '2017-12-08 15:11', amount: 1000000}];

newTx = function(acct, txType, txAmt){
    var curAcct = getAccount(acct);
    var curBalance = parseFloat(curAcct.balance);
    var txAmtDec = parseFloat(txAmt);
    switch (txType.toLowerCase()) {
        case 'd':
            curAcct.balance = curBalance + txAmtDec;
            console.info("Deposited " + txAmt);
            break;
        case 'w':
            if (txAmtDec < curBalance) {
                curAcct.balance = curBalance - txAmtDec;
                console.info("Withdrawing " + txAmt);
            } else {
                console.error("You cannot withdraw more than you have on deposit.");
                return;
            }
            break;
    }
    var d = new Date;
    var txDate = "" + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes();
    trans.push({acct: acct, type: txType, date: txDate, amount: txAmt});
    console.info("New balance is: " + curAcct.balance);
}

module.exports = { addAccount, newTx, userLogin };