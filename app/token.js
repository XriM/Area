const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
var token_secret = 'b1be96e1c1b5f8289035813256d4532502224f6058e3a69c94cca2b8102dbb5bf8c2bf7b650b8cc83bdc34829551a4657b4e1d90f8ace32d88b99a9545cfd0ab';

exports.generateAccessToken = (username) => {
    return jwt.sign({ username: username }, token_secret, { expiresIn: '1h' });
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({ message: 'You need to signin to an account!' });

    jwt.verify(token, token_secret, (err, user) => {
        console.log(user);
        if (err) {
            return res.status(498).send({ message: 'Invalid token!' });
        }
        req.user = user;
        next()
    });
};