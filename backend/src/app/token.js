const jwt = require('jsonwebtoken')
const { pool } = require('../dbConfig')
const { env } = require('dotenv').config()
const axios = require('axios')
const querystring = require('query-string')
const utf8 = require('utf8');
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

exports.getOutlookToken = async (code) => {
  let token = '';
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'code': code,
    'client_id': 'b0ffd704-b17f-46bd-9aa1-31d15f6a7795',
    'scope': 'email openid profile https://graph.microsoft.com/IMAP.AccessAsUser.All https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.ReadBasic https://graph.microsoft.com/Mail.ReadWrite https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Files.ReadWrite.All',
    'redirect_uri': 'http://localhost:8081/profile',
    'grant_type': 'authorization_code',
    'client_secret': '_wM7Q~fQR9T.08lSpO8e~PeBAQrVjFem6vzcX'
  });
  var config = {
    method: 'post',
    url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Cookie': 'fpc=AuDe8GTsKq5CvBhXfWn1CK8uyl36AQAAAMiFsdkOAAAA'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    token = JSON.stringify(response.data.access_token)
  })
  .catch(function (error) {
    console.log(error);
  });

  return token
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
        console.log('avant le return :' + accessToken)
        return accessToken
}

exports.accessTokenReddit = async (code) => {
  let access_token = "";
  const username = '_AH7eByuCQvZ7TW_NpKGUg';
  const password = '';
  let buff = Buffer(utf8.encode(`${username}:${password}`))
  let base64data = buff.toString('base64');

  const data = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:8080"
  });
  const res = await axios.post(process.env.REDDIT_TOKEN_URL, data, {
    headers: {
      Authorization: "Basic " + base64data,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  console.log(res.data)
  console.log(res.data.access_token);
  access_token = res.data.access_token;
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
