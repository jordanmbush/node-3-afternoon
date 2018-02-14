const users = require('./../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
        console.log('login func hit');        
        const { username, password } = req.body;
        let user = users.filter( el => {
            return el.username === username && el.password === password;
        });

        if (user.length > 0) {
            req.session.user.username = username;
            res.status(200).send(req.session.user);
            next();
        } else {
            res.status(500).send();
        }
    },

    register: (req, res, next) => {
        console.log('register func hit');
        let { username, password } = req.body;
        users.push({ id, username, password });
        id++;
        req.session.user.username = username;
        
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        console.log('signout func hit');        
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        console.log('getUser func hit');        
        res.status(200).send(req.session.user);
    }
}