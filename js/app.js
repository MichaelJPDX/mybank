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
    
    // Form handlers
    $(document).on('submit', '#formLogin', function(event) {
        event.preventDefault();
        var uname = $('#username').val();
        var pword = $('#password').val();
        console.log("Posting user " + uname + " password: " + password);
        $.getJSON('http://localhost:3000/login?callback=userAcct', function(data, status) {
                console.log("data: " + data);
            });
    });
});