const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connect to DAtabase
mongoose.connect(config.database, { useMongoClient: true });

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
})

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Connected to database '+err);
})


const app = express();

const users = require('./routes/users')

//Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parse Middleware
app.use(bodyParser.json());

//Passport Midlleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// CORS Middleware
app.use('/users',users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid end');
})

app.get('*', () =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});