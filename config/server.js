const express = require('express');

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

const chatRoute = require('../app/routes/chat');
const indexRoute = require('../app/routes/index')

const app = express();

app.set('view engine','ejs');
app.set('views','./app/views');

// static files
app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// Routes
app.use(chatRoute);
app.use(indexRoute);

module.exports = app;