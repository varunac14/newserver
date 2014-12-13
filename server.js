  
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path') 
  , restCall=require('./routes/gumball'); 

var app = express();
var server = http.createServer(app);
// all environments
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
app.set('port', server_port);
//app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gumball/:id',restCall.getCall);
app.put('/gumball/:id',restCall.putCall);
  
server.listen(server_port, server_ip_address, function(){
	  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
	  console.log(app.get('port'));
	});
	
//http.createServer(app).listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
//});
