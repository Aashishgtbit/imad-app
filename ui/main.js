//counter code
var button = document.getElementById('counter');
button.onclick = function(){
    //create a request..
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable.
    request.onreadystatechange = function(){
    // Process the server response here.
    if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200){
        var counter =  request.respnoseText;
        var span = document.getElementById('count');
        span.innerHTML= counter.toString();
    }
    } 
    //request not done yet;
    };
       //make a request.
     httpRequest.open('GET', 'http://aashishtiwari97.imad.hasura-app.io/counter', true);
     httpRequest.send();
        
    };