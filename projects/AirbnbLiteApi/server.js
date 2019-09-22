var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./api/models/UserModel'),
  Property = require('./api/models/PropertyModel'),
  bodyParser = require('body-parser'),
  passport = require('passport');

mongoose.Promise = global.Promise;

const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser : true })
  .then(() => console.log('Database connected'))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);


var routes = require('./api/routes/AirbnbLiteRoute');
routes(app);
app.listen(port);

console.log('AirbnbLite RESTful API server started on: ' + port);