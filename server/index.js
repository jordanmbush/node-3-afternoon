const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();
const { checkForInitialSession } = require('./middlewares/checkForSession');

app.use(bodyParser.json());

app.use( session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
        age: 6000
    }
}))
app.use( checkForInitialSession );

const PORT = 4000;
app.listen( PORT, () => console.log(`Hey Jordan. I\'m over here on port ${PORT}!`));
