$(document).foundation();

$(document).ready(function(){
    // Compile the templates
    var loginSrc = $("#loginForm").html();
    var loginTpl = Handlebars.compile(loginSrc);
    var addSrc = $("#addAccount").html();
    var addTpl = Handlebars.compile(addSrc);
    var txSrc = $("#transTpl").html();
    var txTpl = Handlebars.compile(txSrc);
    
    // Handler for transactions
    Handlebars.registerHelper('translist', function(items, options) {
        var out = "";

        for(var i=0, l=items.length; i<l; i++) {
            out = out + options.fn(items[i]);
        }

        return out;
    });
    
    // Menu handlers
    $('#showLogin').on('click', function(event) {
        event.preventDefault();
        var context = {};
        var compHTML = loginTpl(context);
        $('#content-area').html(compHTML);
        
    });

    $('#showNewAcct').on('click', function(event) {
        event.preventDefault();
        var context = {};
        var compHTML = addTpl(context);
        $('#content-area').html(compHTML);
        
    });
    
    //  Vars for account data
    var acctID = 0;
    var friendlyName = "";
    var balance = 0.0;
    
    // Form handlers
    $(document).on('submit', '#formLogin', function(event) {
        event.preventDefault();
        var uname = $('#username').val();
        var pword = $('#password').val();
        console.log("Posting user " + uname + " password: " + password);
        $.ajax({
            type: "POST",
            url: '/login', 
            data: {username: uname, password: pword}, 
            dataType: 'json',
            success: function(data, status) {
                console.log("data: " + JSON.stringify(data));
            }
        });
    });
});