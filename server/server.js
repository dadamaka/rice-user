// Load environment variables
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: './env/production.env' });
}

var express = require('express');
var app = express();

require('./config/initialize.js')(app, express);

require('./routes/api-routes.js')(app);

app.listen(port, function() {
    console.log("Listening to Users Service on port: ", port);
});

app.listen(Number(process.env.PORT), process.env.HOST, function() {
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
  console.log(process.env.APP_NAME + ' is listening at ' + process.env.HOST + ' on port ' + process.env.PORT + '.')
});