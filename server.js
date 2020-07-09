var PORT = process.env.PORT || 8080;

const
  express = require('express'),
  path = require('path'),
  https = require('https'),
  fs = require('fs');

const app = express();

//app.use(express.bodyParser());
app.use(require('./src/routes'));

let server = null;
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'PRODUCTION') {
  server = app.listen(PORT, null, function () {
    console.log("Listening on port " + PORT);
  });
}
else {
  const options = {
    key: fs.readFileSync(path.join(__dirname, '/https-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/https-cert.pem'))
  };
  server = https.createServer(options, app).listen(PORT, null, function () {
    console.log('Listening on port ' + PORT);
  })
}

require('./src/socket')(server);