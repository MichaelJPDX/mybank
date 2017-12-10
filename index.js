/*
**  Main driver for my banking application
*/
const program = require('commander');

const { addAccount, getAccount, newTx } = require('./databank');

program
    .version('0.0.1')
    .description('MyBanking Applicaiton');

program
    .command('addAccount <name> <username> <password>')
    .alias('a')
    .description('Add a new account')
    .action((name, username, password) => {
        addAccount({name: name, username: username, password: password});
});

program
    .command('newTx <acct> <type> <amount>')
    .alias('t')
    .description("New transaciton")
    .action((acct, type, amount) => {
        newTx(acct, type, amount);
});

program.parse(process.argv);