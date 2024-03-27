const jwt = require('jsonwebtoken');
const secret = "ganjarpranowo03"

function signToken(data) {
    const token = jwt.sign(data, secret);
    return token;
}

function verifyToken(token) {
    const data = jwt.verify(token, secret);
    return data;
}

module.exports = {
    signToken,
    verifyToken
}