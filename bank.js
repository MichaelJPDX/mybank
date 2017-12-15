/*
**  Main driver for my banking application
*/
const program = require('commander'); // handles command-line inputs
const { prompt } = require('inquirer'); // supports interactive console

const { addAccount, getAccount, newTx, userLogin, listTx } = require('./databank');

var userAcct = false;
var exitBank = false;

program
    .version('0.0.1')
    .description('MyBanking Applicaiton');

function startupOptions() {
    // On start up, offer login or new account
    prompt([
        {
            type: 'list',
            name: 'login',
            choices: [{ name: 'Login', value: 'L'}, 
                      { name: 'Create new accout', value: 'N'},
                      { name: 'Exit', value: 'X' }],
            message: 'Login or create new account'
        }
        ]).then(answers => {
            switch (answers.login) {
                case "L":
                    promptLogin();
                    break;
                case "N":
                    promptNewAccount();
                    break;
                case "X":
                    return true;
                    break;
            }
    });
    return;
}
function acctOptions() {
    prompt([
        {
            type: 'list',
            name: 'optsel',
            choices: [{ name: 'Deposit', value: 'd'},
                      { name: 'Withdrawal', value: 'w'},
                      { name: 'List Transactions', value: 'l'},
                      { name: 'Logout', value: 'x'}
                     ],
            message: "Choose an option"
        }
    ]).then(answers => {
        switch (answers.optsel) {
            case "d":
                addTrans('d');
                break;
            case "w":
                addTrans('w');
                break;
            case "l":
                listTrans();
                break;
            case "x":
                startupOptions();
                break;
        }
    })
}

// Questions for adding account
const addQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Your name ...'
    },
    {
        type: 'input',
        name: 'username',
        message: 'Give us a user name ...'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Your password for logging in ...'
    }
];

function promptNewAccount() {
    prompt(addQuestions).then(answers => {
        if (addAccount(answers)) {
            promptLogin();
        } else {
            promptNewAccount();
        }
    });
}

const loginQuestions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter your user name ...'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Your password is ...'
    },
];
function promptLogin() {
    prompt(loginQuestions).then(answers => {
        userAcct = userLogin(answers);
        if (!userAcct) { 
            promptLogin(); 
        } else {
            console.info("Welcome back " + userAcct.name + " your current balance is " + userAcct.balance);
            acctOptions();
        }
    });
}

function addTrans(transType) {
    prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Amount:'
        }
    ]).then(answers => {
        newTx(userAcct.id, transType, answers.amount);
        acctOptions();
    });
}

function listTrans() {
    var transactions = listTx(userAcct.id);
    var dispType = '';
    if (transactions.length > 0) {
        console.log('Date\t\t\tType\t\tAmount')
        for (var n = 0; n < transactions.length; n++) {
            if (transactions[n].type.toLocaleLowerCase() === 'd') {
                dispType = 'Deposit\t';
            } else {
                dispType = 'Withdrawal';
            }
            console.log(transactions[n].date + '\t' + dispType + '\t' + parseFloat(transactions[n].amount));
        }
        console.log('Ending balance: ' + userAcct.balance);
    }
    acctOptions();
}

startupOptions();
/*program
    .command('addAccount')
    .alias('a')
    .description('Add a new account')
    .action(() => {
        prompt(addQuestions).then(answers => addAccount(answers));
});

program
    .command('newTx <acct> <type> <amount>')
    .alias('t')
    .description("New transaciton")
    .action((acct, type, amount) => {
        newTx(acct, type, amount);
});

program.parse(process.argv);*/