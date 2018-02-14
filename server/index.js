const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();
const { checkForInitialSession } = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');

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
//      AUTH_CONTROLLER
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);
//      CART_CONTROLLER
app.post('/api/cart', cc.add);
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.remove);
