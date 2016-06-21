var morgan = require('morgan');
var bodyParser = require('body-parser');

require('./db.js');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  // app.use(express.static(__dirname + './../../client'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  // app.engine('jade', jade);
  // app.set('view engine', 'jade');
  // app.set('views', __dirname + './../views');
}