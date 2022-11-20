const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
let port = process.env.PORT;

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

if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started succesfully");
});