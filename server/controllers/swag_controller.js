const swag = require('./../models/swag');

module.exports = {
    read: (req, res, next) => {
        console.log('read func hit');
        res.status(200).send(swag);
    }
}
