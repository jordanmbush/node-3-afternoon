const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();
const { checkForInitialSession } = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');

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

const PORT = 3000;
app.listen( PORT, () => console.log(`Hey Jordan. I\'m over here on port ${PORT}!`));

// ENDPOINTS
app.get('/api/swag', sc.read);