/*
**  Data structures and maintenance
**
*   These structures would normally be empty, but I've added some data for testing
*/
var accounts = [{id: 1, name: 'Michael', username: 'michaelBKK', password: '12345', balance: 1000000}];

/*
* Add a new account, what conditioning required?
*/
addAccount = function(acctInfo){
    var newAcct = {id: accounts.length, name: acctInfo.name, username: acctInfo.username, password: acctInfo.password, balance: 0};
    accounts.push(newAcct);
    console.info("added account " + newAcct.name);
}
function getAccount(key){
    return accounts[key];
}

var trans = [{acct: 1, type: 'D', date: '2017-12-08 15:11', amount: 1000000}];

newTx = function(acct, txType, txAmt){
    var curAcct = getAccount(acct);
    switch (txType.toLowerCase()) {
        case 'd':
            curAcct.balance += txAmt;
            console.info("deposited " + txAmt);
            break;
        case 'w':
            curAcct.balance -+ txAmt;
            console.info("Withdrawing " + txAmt);
            break;
    }
    var d = new Date;
    var txDate = "" + d.getFullYear() + '-' + (d.getMont()+1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes();
    trans.push({acct: acct, type: txType, date: txDate, amount: txAmt});
}

module.exports = { addAccount, newTx };