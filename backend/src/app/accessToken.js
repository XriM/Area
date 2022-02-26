const { pool } = require('../dbConfig')
const { env } = require('dotenv').config()
const { postUserService } = require('./services')
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

exports.accessTokensHandler = async (req, res) => {
    const body = req.body

    //if ('github' in body) {
        const CODE = body.code

        const githubToken = await axios.get(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${CODE}`).then((res) => res.data).catch((error) => {
            throw error
        })

        const decoded = querystring.parse(githubToken)
        const accessToken = decoded.access_token

        axios.get("https://api.github.com/user", { headers: { Authorization: `Bearer ${accessToken}` },}).then((res) => res.data).catch((error) => {
            console.error('Error getting user from GitHub')
            throw error
        })
        req.body.code = accessToken
        postUserService(req, res)
        res.status(200).send({ message: 'Service token successfully loaded' })
    //}
}