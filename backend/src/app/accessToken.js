const { pool } = require('../dbConfig')
const { env } = require('dotenv').config()
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

exports.accessTokenGitHub = async (oldToken) => {
        const CODE = oldToken

        const githubToken = await axios.get(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${CODE}`).then((res) => res.data).catch((error) => {
            throw error
        })

        const decoded = querystring.parse(githubToken)
        const accessToken = decoded.access_token

        axios.get("https://api.github.com/user", { headers: { Authorization: `Bearer ${accessToken}` },}).then((res) => res.data).catch((error) => {
            console.error('Error getting user from GitHub')
            throw error
        })
        return accessToken
}