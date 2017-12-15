$(document).foundation();

$(document).ready(function(){
    // Compile the templates
    var loginSrc = $("#loginForm").html();
    var loginTpl = Handlebars.compile(loginSrc);
    var greetSrc = $("#greeting").html();
    var greetTpl = Handlebars.compile(greetSrc);
    var addSrc = $("#addAccount").html();
    var addTpl = Handlebars.compile(addSrc);
    var txSrc = $("#transTpl").html();
    var txTpl = Handlebars.compile(txSrc);
    var startSrc = $("#startMenu").html();
    var smTpl = Handlebars.compile(startSrc);
    var acctSrc = $("#acctOptions").html();
    var aoTpl = Handlebars.compile(acctSrc);
    
    // Handler for transactions
    Handlebars.registerHelper('translist', function(items, options) {
        var out = "";

        for(var i=0, l=items.length; i<l; i++) {
            out = out + options.fn(items[i]);
        }

        return out;
    });
    
    // Menu handlers
    $(document).on('click', '#showLogin', function(event) {
        event.preventDefault();
        var context = {};
        var compHTML = loginTpl(context);
        $('#content-area').html(compHTML);
        
    });

    $(document).on('click', '#showNewAcct', function(event) {
        event.preventDefault();
        var context = {};
        var compHTML = addTpl(context);
        $('#content-area').html(compHTML);
        
    });
    
    // make numbers pretty
    Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     };
    
    // Make transactions pretty
    function prettyTx(translist) {
        for (var j = 0; j < translist.length; j++) {
            if (translist[j].type === 'd') {
                translist[j].type = 'Deposit';
                translist[j].amount = parseFloat(translist[j].amount).formatMoney(2);
            } else {
                translist[j].type = 'Withdrawal';
                translist[j].amount = '-' + parseFloat(translist[j].amount).formatMoney(2);
            }
        }
        return translist;
    }
    
    //  Vars for account data
    var acctID = 0;
    var friendlyName = "";
    var balance = 0.0;
    
    // ******* Form handlers
    // Login
    $(document).on('submit', '#formLogin', function(event) {
        event.preventDefault();
        var uname = $('#username').val();
        var pword = $('#password').val();
        //console.log("Posting user " + uname + " password: " + password);
        $.ajax({
            type: "POST",
            url: '/login', 
            data: {username: uname, password: pword}, 
            dataType: 'json',
            success: function(data, status) {
                //console.log("data: " + JSON.stringify(data));
                acctID = data.id;
                friendlyName = data.name;
                balance = data.balance.formatMoney(2);
                compHTML = greetTpl({name: friendlyName, balance: balance});
                $('#content-area').html(compHTML);
                $('#menu').html(aoTpl({}));
            },
            error: function(xhr, options, thrownError) {
                $('#errorText').text(xhr.responseText);
            }
        });
    });

    // Add account
    $(document).on('submit', '#formAdd', function(event) {
        event.preventDefault();
        var fname = $('#addName').val();
        var uname = $('#addUser').val();
        var pword = $('#addPass').val();
        //console.log("Posting user " + uname + " password: " + password);
        $.ajax({
            type: "POST",
            url: '/adduser', 
            data: { name: fname, username: uname, password: pword}, 
            dataType: 'json',
            success: function(data, status) {
                //console.log("data: " + JSON.stringify(data));
                $('#content-area').html("<h2>Success!</h2><p>Your account has been created. Please login.</p>");
            },
            error: function(xhr, options, thrownError) {
                $('#errorAdd').text(xhr.responseText);
            }
        });
    });
    
    // Get transactions
    $(document).on('click', '#register', function(event) {
        //console.log("displaying Transactions");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: '/gettx', 
            data: { account: acctID }, 
            dataType: 'json',
            success: function(data, status) {
                console.log("data: " + JSON.stringify(data));
                compHTML = txTpl({ balance: balance, transactions: prettyTx(data) });
                $('#content-area').html(compHTML);
            }
        });
    });
    
    // add transaction - will return a new transaction list, so just repaint
    $(document).on('submit', '#newTx', function(event) {
        event.preventDefault();
        var ttype = $('#transtype').val();
        var tamount = $('#txAmount').val();
        $.ajax({
            type: "POST",
            url: '/addtrans', 
            data: { account: acctID, transtype: ttype, txamount: tamount }, 
            dataType: 'json',
            success: function(data, status) {
                console.log("data: " + JSON.stringify(data.transactions));
                compHTML = txTpl({ balance: data.balance.formatMoney(2), transactions: prettyTx(data.transactions) });
                $('#content-area').html(compHTML);
            },
            error: function(xhr, options, thrownError) {
                $('#errorTx').text(xhr.responseText);
            }
        });
    });
    
    // Handle logout
    $(document).on('click', '#logout', function(event) {
        // reset account data
        acctID = 0;
        friendlyName = "";
        balance = 0.0;
        //  reset contents to login options
        $('#content-area').html('<h2>Welcome to MyBank</h2><p>Please chose one of the options at left to get started.</p>');
        $('#menu').html(smTpl({}));
    });
    
});