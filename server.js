const express = require('express'),
    mongoose = require('mongoose'),
    port = 3003 || process.env.PORT,
    app = express(),
    db = mongoose.connection;

mongoose.Promise = global.Promise;
const mongoURI = 'mongodb://localhost/travel_app';

// Connect to Mongo
mongoose.connect(mongoURI, { useMongoClient: true });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


// open the connection to mongo
db.on('open', () => {
    console.log('Connection made!');
});

app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON


app.use(express.static('public'));

//Routes
const travelsController = require('./controllers/travelsController.js');
app.use('/travels', travelsController);

app.listen(port, () => {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});
