var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config={
    user:'aashishtiwari97',
    database:'aashishtiwari97',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one' :{
    
        title:'Article-one|Aashish Tiwari',
        heading:'Article One',
        date:'Aug 14, 2016',
        content:
        `<p>
             Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the  web developement.
        </p>
        
        <p>
             Hurrah !! I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement. Here I have created this web page to learn the basics of the web developement.
        </p>
        `
    },
    'article-two':{
        title:'Article-Two|Aashish Tiwari',
        heading:'Article Two',
        date:'Aug 15, 2016',
        content:
        `<p>
             Here I have created this web page to learn the basics of the web developement.Here I have created this web page to learn the basics of the web developement.
        </p>
        
        <p>
             Here I have created this web page to learn the basics of the web developement.
        </p>
        `},
    'article-three':{
        title:'Article-Three|Aashish Tiwari',
        heading:'Article Three',
        date:'Aug 15, 2016',
        content:
        `<p>
             This is the content of the article three.
        </p>
        
        
        `}
};

function createTemplate(data){
    var title= data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate= `
            <html>
                <head>
                    <title>
                       ${title}
                    </title>
                    <meta name="viewport" content="width-device-width,initial-scale-1" />
                    <link href="/ui/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div class="container">
                        
                        <div>
                            <a href="/">Home</a>
                        </div>
                        <hr/>
                        <h3>
                            ${heading}
                        </h3>
                        <div>
                            ${date.toDateString()}
                        </div>
                         <div>
                            ${content}
                        </div>
                </div>
                    
                </body>
                
            </html>
            
            `;
   return htmlTemplate; 
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req, res){
    //make a select request.
    pool.query('Select * From test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
           }
            else {
               res.send(JSON.stringify(result.rows));
           }
    });
    //make a request with the results.
});
var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req, res){
    //Get the name from the request.
    var name=req.query.name;
    
    names.push(name);
    //JSON - JavaScript object Notation.
    res.send(JSON.stringify(names));
});

app.get('/article/:articleName', function(req, res){
    
    pool.query("SELECT * FROM article Where title = '" + req.params.articleName+"'" , function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length=== 0){
                res.status(404).send("Article not found");
            }else{
                    var articleData = result.rows[0];
                    res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
