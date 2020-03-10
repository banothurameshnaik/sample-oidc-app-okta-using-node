require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');

const {
    welcomeHandler,
    callbackHandler,
    logoutHandler,
} = require('./handlers.js');

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// Dashboard
app.get('/', welcomeHandler);

// Login end points
app.get('/login/callback', callbackHandler);
app.post('/login/callback', callbackHandler);

// Logout end ponts
app.get('/logout', logoutHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));