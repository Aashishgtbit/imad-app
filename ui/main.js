
//submit username/password to login.

var submit = document.getElementById('submit_btn');
submit.onclick= function() {
    
    //make a request to the server and send the name.
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable.
        request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200){
                            console.log('user logged in');
                            alert(' Logged in successfully');
                         }else if(request.status === 403){
                             alert('username/password is incorrect');
                         }else if(request.status === 500){
                             alert('Something went wrong!');
                         }
                    } 
            //request not done yet;
            };
    //make a request.
        var username = document.getElementById('username');
         var password = document.getElementById('password');
        console.log(username);
        console.log(password);
        request.open('POST', 'http://aashishtiwari97.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type','application/json');
        request.send(JSON.stringify({username:username , password:password}));
        
    //capture a list of names and render it as list.
   
};