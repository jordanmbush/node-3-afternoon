const swag = require('./../models/swag');

module.exports = {
    search: (req, res, next) => {
        console.log('search func hit');
        let { category } = req.query;
        
        if (!category) {
            res.status(200).send(swag);
            next();
        } else {
            let filteredSwag = swag.filter( el => {
                return el.category === category;
            })

            console.log('filteredSwag: ', filteredSwag);
            res.status(200).send(filteredSwag);
            next();
        }
    }
}