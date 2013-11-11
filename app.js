var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
var fs=require("fs");

var app = express();

app.engine('ejs', require('ejs-locals')); // layout partial block
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(express.favicon()); // /favicon.ico
if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(express.bodyParser());  // req.body....

app.use(express.cookieParser()); // req.cookies

app.use(app.router);

app.get('/', function(req, res, next) {
    res.render("index", {

    });
});

app.get('/login', function(req, res, next) {
    res.render("login", {

    });
});
app.get('/page_upload', function(req, res, next) {
    res.render("page_upload", {

    });
});
app.get('/registration', function(req, res, next) {
    res.render("registration", {

    });
});
app.post('/upload', function(req, res, next) {

        console.log("Request handler 'upload' was called.");

        var form = new formidable.IncomingForm();
        console.log("about to parse");
        form.parse(req, function(error, fields, files) {
            console.log("parsing done");


            fs.rename(files.upload.path, "/tmp/test.png", function(err) {
                if (err) {
                    fs.unlink("/tmp/test.png");
                    fs.rename(files.upload.path, "/tmp/test.png");
                }
            });
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("received image:<br/>");
            res.write("<img src='/show' />");
            res.end();
        });

});

app.post('/show', function(req, res, next) {

    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(error + "\n");
            res.end();
        } else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    });

});

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
    // NODE_ENV = 'production'
    if (app.get('env') == 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});
/*

 var routes = require('./routes');
 var user = require('./routes/user');

 // all environments

 app.get('/', routes.index);
 app.get('/users', user.list);

 */

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});