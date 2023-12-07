const jwt = require('jsonwebtoken');
require('dotenv').config();

function genrateToken(data) {
    const token = jwt.sign({id:data},process.env.SECRET_KEY);
    return token;
}

module.exports.genrateToken=genrateToken;