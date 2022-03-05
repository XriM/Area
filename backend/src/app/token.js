const jwt = require('jsonwebtoken')
const { pool } = require('../dbConfig')
const { env } = require('dotenv').config()
const axios = require('axios')
const querystring = require('query-string')
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

exports.getOutlookToken = async (code) => {
  const outlookToken = await axios.get('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
    'code': code,
    'client_id': 'dee479f7-7be3-49a8-a238-71bf50de2175',
    'scope': 'email openid profile https://graph.microsoft.com/IMAP.AccessAsUser.All https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.ReadBasic https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Files.ReadWrite.All',
    'redirect_uri': 'https://localhost/callback',
    'grant_type': 'authorization_code',
    'client_secret': 'Re47Q~hMlvpAZ7BN8SnBIChQK4SMEIFvgv1XF',
  });
  return outlookToken.access_token
}

exports.accessTokenGitHub = async (oldToken) => {
        const CODE = oldToken

        const githubToken = await axios.get(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${CODE}`).then((res) => res.data).catch((error) => {
            throw error
        })

        const decoded = querystring.parse(githubToken)
        const accessToken = decoded.access_token

        axios.get("https://api.github.com/user", { headers: { Authorization: `Bearer ${accessToken}` },}).then((res) => res.data).catch((error) => {
            console.log('Error getting user from GitHub')
            //throw error
        })
        return accessToken
}

exports.accessTokenReddit = async (code) => {
  let access_token = "";

  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/profile"
  });
  axios.post(process.env.REDDIT_TOKEN_URL, data, {
    headers: {
      Authorization: "Basic " + process.env.REDDIT_CLIENT_ID,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log(res.data["access_token"]);
    access_token = res.data["access_token"];
  }).catch(error => {
    console.log("Error getting reddit token")
  });
  return access_token;
}

exports.generateAccessToken = (username) => {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).send({ message: 'You need to signin to an account!' })

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(user)
    if (err) {
      return res.status(498).send({ message: 'Invalid token!' })
    }
    req.user = user
    next()
  })
}
