const jwt = require('jsonwebtoken');
const config = require('../config');

const authCheck = async (req, res, next) => {  
    if (req.headers['authorization']) {
        try {
            let token = req.headers['authorization'].split(' ')[1];
            let decoded = await jwt.verify(token, config.secret);
            console.log(decoded);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).send({
                status: 401,
                message: 'Unauthorized',
                data: null
            });
        }
    } else {
        res.status(401).send({
            status: 401,
            message: 'Unauthorized',
            data: null
        });
    }
}

module.exports = authCheck;