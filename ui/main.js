//counter code
    var button = document.getElementById('counter');

button.onclick = function() {
    
    //create a request..
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable.
        request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200){
                            var counter =  request.responseText;
                            var span = document.getElementById('count');
                            span.innerHTML= counter.toString();
                         }
                    } 
            //request not done yet;
            };
    //make a request.
    

     request.open('GET', 'http://aashishtiwari97.imad.hasura-app.io/counter', true);
     request.send(null);
        
};
//submit name

var submit = document.getElementById('submit_btn');
submit.onclick= function() {
    
    //make a request to the server and send the name.
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable.
        request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200){
                            var names =  request.responseText;
                            names = JSON.parse(names);
                            var list = '';
                            for(var i =0;i<names.length;i++){
                                list += '<li>' + names[i] + '</li>';
                            }
                            var ul = document.getElementById('namelist');
                            ul.innerHTML = list;
                         }
                    } 
            //request not done yet;
            };
    //make a request.
        var nameInput = document.getElementById('name');
        var name = nameInput.value;
        request.open('GET', 'http://aashishtiwari97.imad.hasura-app.io/submit-name?name=' + name, true);
        request.send(null);
        
    //capture a list of names and render it as list.
   
};