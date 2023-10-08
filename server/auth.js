require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticate = (req) => {
    const token = req.headers.authorization;
    if (!token) throw new Error('Authentication required');
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    authenticate
}