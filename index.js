/*
**  Main driver for my banking application
*/
const program = require('commander'); // handles command-line inputs
const { prompt } = require('inquirer'); // supports interactive console

const { addAccount, getAccount, newTx, userLogin } = require('./databank');

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
                    promptLogin();
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
    prompt(addQuestions).then(answers => addAccount(answers));
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