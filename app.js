const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
//Middleware packages
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();

require('dotenv').config();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('BlogSecure'));
app.use(session({
  secret: 'BlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/postRoutes.js');
app.use('/', routes);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});