const swag = require('./../models/swag');

module.exports = {
    add: (req, res, next) => {
        console.log('add func hit');
        let id = +req.query.id;
        let { cart } = req.session.user;

        if (cart.filter( item => item.id === id).length > 0 ) {
            res.status(200).send(req.session.user);
            next();
        } else {
            let newItem = swag.filter( item => item.id === id)[0];
            cart.push(newItem);
            req.session.user.total += newItem.price;
            res.status(200).send(req.session.user);
            next();            
        }
    },
    
    remove: (req, res, next) => {
        console.log('remove func hit');
        
        let id = +req.query.id;
        let { cart } = req.session.user;
        let index = null;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                index = i;
                break;
            }
        }

        let deletedItem = cart.splice( index, 1 )[0];
        console.log('deletedItem: ', deletedItem);
        req.session.user.total -= deletedItem.price;

        res.status(200).send(req.session.user);
        next();

    },

    checkout: (req, res, next) => {
        console.log('checkout func hit');
        
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
        next();
    },
}