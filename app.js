var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ex_session = require('express-session');
var bcrypt = require("bcrypt-nodejs");
var flash      = require('connect-flash');

Object.assign=require('object-assign');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Set up passport to help with user authentication (guest/password)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers
var ObjectID = require('mongodb').ObjectID 
	
var db = new Db('db_ramapo_final', new Server(172.30.200.35, 27017));
  db.open(function(err, db) {
      console.log("Connected correctly to server.");
      if (err)  console.log("Error " + err);
      db_rest = db.collection("db_rest_list");
	
  });	  
	
	
var username = "guest";
var password = "password";

var createHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
	
}
password = createHash(password);
console.log(" ggggggggg" + password);
//bcrypt.genSalt(10, function(err, salt) {
//    bcrypt.hash(password, salt, function(err, hash) {
 //       password = hash;
  //      console.log("Hashed password = " + password);
   // }, null);
//});
	
	
	
	
var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));   //****
app.use(bodyParser.urlencoded());   //****
app.use(cookieParser());
app.use(ex_session( { secret : 'heidiandaddie'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());   //...
app.use(passport.session());      //...

app.use(function(req,res,next){
    req.db = db;
	req.ObjectID = ObjectID;
    next();
});

passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },

    function(user, pswd, done) {
        if ( user != username ) {
            console.log("Username mismatch");
            return done(null, false);
        }

        bcrypt.compare(pswd, password, function(err, isMatch) {
            if (err) return done(err);
            if ( !isMatch ) {
                console.log("Password mismatch");
            }
            else {
                console.log("Valid credentials");
            }
            done(null, isMatch);
        });
      }
));
  passport.serializeUser(function(username, done) {
      // this is called when the user object associated with the session
      // needs to be turned into a string.  Since we are only storing the user
      // as a string - just return the username.
      done(null, username);
  });

  passport.deserializeUser(function(username, done) {
      // normally we would find the user in the database and
      // return an object representing the user (for example, an object
      // that also includes first and last name, email, etc)
      done(null, username);
   });
   
   
// Posts to login will have username/password form data.
// passport will call the appropriate functions...
routes.post('/login',
    passport.authenticate('local', { successRedirect: '/start',
                                     failureRedirect: '/login_fail',
                                  })
);

routes.get('/login', function (req, res) {
  res.render('login', {});
});

routes.get('/login_fail', function (req, res) {
  res.render('login_fail', {});
});

routes.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

app.use('/', routes);

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
