// server.js

// BASE SETUP
// =============================================================================
// call the packages we need
var express      = require('express');        // call express
var app          = express();                 // define our app using express
var port         = 8081 || process.env.PORT || 8080;
var bodyParser   = require('body-parser');
// var passport     = require('passport');
var mongoose     = require('mongoose');
// var compression  = require('compression'); //npm install compression --save
var path         = require('path');


// CONFIGURATION
// =============================================================================
var config = require('./config/app');
mongoose.connect(config.database); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// FRONTEND SETUP
// =============================================================================
var oneDay = 86400000;
app.use(express.static(path.join(__dirname, '/public'), { maxAge: oneDay }));
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');


// ROUTERS
// =============================================================================
var serverRouter    = require('./routes/server');
var helpRouter      = require('./routes/help');
var authRouter      = require('./routes/auth');
var usersRouter     = require('./routes/users');
var heroesRouter    = require('./routes/heroes');
var petsRouter     = require('./routes/pets');
var itemsRouter     = require('./routes/items');
var cursesRouter     = require('./routes/curses');
var guildsRouter    = require('./routes/guilds');
var campaignsRouter = require('./routes/campaigns');

// REGISTER OUR ROUTES -------------------------------
app.use('/api', serverRouter);
app.use('/api/help', helpRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/heroes', heroesRouter);
app.use('/api/pets', petsRouter);
app.use('/api/items', itemsRouter);
app.use('/api/curses', cursesRouter);
app.use('/api/guilds', guildsRouter);
app.use('/api/campaigns', campaignsRouter);

app.get('/*', function (request, response){
    response.redirect('/api/help')
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
