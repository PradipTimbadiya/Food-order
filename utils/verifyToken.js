const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(token){
    try {
        const admintoken = jwt.verify(token,process.env.SECRET_KEY);
        return admintoken;
    } catch (error) {
        return undefined;
    }
}

module.exports.verifyToken=verifyToken;