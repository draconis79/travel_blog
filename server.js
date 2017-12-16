// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
require('pretty-error').start();

// CONFIG
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/books_users_api'

// DB
mongoose.connect(mongoURI, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
const travelsController = require('./controllers/travelsController.js');
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
    secret: 'Yeah',
    resave: true,
    saveUninitialized: false,
    maxAge: 2592000000
}));


app.use('/travels', travelsController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);

// LISTEN
app.listen(PORT, () => {
    console.log('=======================');
    console.log('Running on PORT ' + PORT);
    console.log('=======================');
});
