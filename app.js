/*
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  mongodb = require('mongodb');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

/* main page */
app.get('/', routes.index);

/* data */
app.post('/list', user.list);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

//var mongo = new mongodb.Db('todo', new mongodb.Server("127.0.0.1", 27017, {}), {
var db = mongodb.connect('mongodb://127.0.0.1:27017?w=1', function(er, db) {
  var collection = db.collection('test');
  collection.insert([{name:'aaa'}, {name:'bbb'}], function(er, res){
    collection.find({}).toArray(function(err, docs) {
      console.log("Returned #" + docs.length + " documents");
      docs.forEach(function(v){
        console.log('test:', v);
      });
    });

  });
/*
  var issues = db.collection('issues');
  issues.insert([{description:'to do smth.'}, {description:'to do smth. else'}], function(error, saved){
      saved.forEach(function(issue){
        console.log('inserted issue:', issue);
      });
      db.close();
  });
*/
});