const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();
const { checkForInitialSession } = require('./middlewares/checkForSession');
// REQUIRE CONTROLLERS
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

// GLOBAL MIDDLEWARES
app.use(bodyParser.json());

app.use( session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        age: 6000
    }
}))
app.use( checkForInitialSession );
// app.use( express.static('./../build'));
app.use( express.static( `${__dirname}/build` ) );

// START THE SERVER
const PORT = 3000;
app.listen( PORT, () => console.log(`Hey Jordan. I\'m over here on port ${PORT}!`));

// ENDPOINTS
//      SWAG_CONTROLLER
app.get('/api/swag', swag_controller.read);
//      AUTH_CONTROLLER
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);
//      CART_CONTROLLER
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.remove);
//      SEARCH_CONTROLLER
app.get('/api/search', search_controller.search);
