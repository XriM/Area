import jwt = require('jsonwebtoken');
import dotenv = require("dotenv")

dotenv.config()

function generateAccessToken(username): any {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '600s' });
}

function authenticateToken (req: any, res: any, next: any): any {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).send({ message: 'You need to signin to an account!' });

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);
    if (err) {
      return res.status(498).send({ message: 'Invalid token!' });
    }
    req.user = user;
    next()
  })
};

export = {generateAccessToken, authenticateToken};