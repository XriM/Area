const { login, googleLogin } = require('./app/login')
const { authenticateToken } = require('./app/token')
const { getUserServices, getUserService, postUserService } = require('./app/services')
const { signup } = require('./app/signup')
const { usersGet } = require('./app/users')
const { userGet } = require('./app/users')
const { userPatch } = require('./app/users')
const { userDelete } = require('./app/users')
const { about } = require('./app/about')
const { getReactions, getReaction, sendDiscordMessage } = require('./app/reactions')
const { getActions, getAction } = require('./app/actions')
const { getAreas, getArea, postArea, patchArea, deleteArea } = require('./app/areas')
const { hookHandler, createGitHubHook, getGitHubHook, deleteGitHubHook } = require('./app/hook')
const ngrok = require('ngrok')
const express = require('express')
const bodyParser = require('body-parser')
const { env } = require('dotenv').config()
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

// Constants
const PORT = process.env.PORT
const HOST = process.env.HOST

// App
const app = express()

// API doc generation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Area API',
      description: 'Area API Information',
      servers: ['http://localhost:8080/'],
    },
  },
  apis: ['./src/server.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to get every users, access restricted
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users', authenticateToken, usersGet)

/**
 * @swagger
 * /users/:username:
 *  get:
 *    description: Use to get a specific user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username', authenticateToken, userGet)

/**
 * @swagger
 * /users/:username:
 *  patch:
 *    description: Use to update a specific user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account | No fields specified
 *      '498':
 *        description: Invalid token!
 */
app.patch('/users/:username', authenticateToken, userPatch)

/**
 * @swagger
 * /users/:username:
 *  delete:
 *    description: Use to delete a user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.delete('/users/:username', authenticateToken, userDelete)

/**
 * @swagger
 * /users/signup:
 *  post:
 *    description: Use to signup to Area
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Please enter all fields | Password should be at least 6 characters | Email address already in use!
 */
app.post('/users/signup', signup)

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: Use to signin to Area
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Failed to login! | Email doesn't exists! | Wrong password!
 */
app.post('/users/login', login)

/**
 * @swagger
 * /users/google_login:
 *  post:
 *    description: Use to signin to Area via google
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Failed to login!
 */
app.post('/users/google_login', googleLogin)

/**
 * @swagger
 * /users/:username/services:
 *  get:
 *    description: Use to get all available services
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/services', authenticateToken, getUserServices)

/**
 * @swagger
 * /users/:username/services/:service_id:
 *  get:
 *    description: Use to get a specific service
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: No such service!
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/services/:service_id', authenticateToken, getUserService)

/**
 * @swagger
 * /users/:username/services/:service_id:
 *  post:
 *    description: Use to add a configuration such as an authentication token to a specific service 
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: No service with this id
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.post('/users/:username/services/:service_id', authenticateToken, postUserService)

/**
 * @swagger
 * /users/:username/reactions:
 *  get:
 *    description: Use to get all available reactions
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/reactions', authenticateToken, getReactions)

/**
 * @swagger
 * /users/:username/reactions/:reaction_id:
 *  get:
 *    description: Use to get a specific reaction
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/reactions/:reaction_id', authenticateToken, getReaction)

/**
 * @swagger
 * /users/:username/actions:
 *  get:
 *    description: Use to get all available actions
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/actions', authenticateToken, getActions)

/**
 * @swagger
 * /users/:username/actions/:action_id:
 *  get:
 *    description: Use to get a specific action
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/actions/:action_id', authenticateToken, getAction)

/**
 * @swagger
 * /users/:username/areas:
 *  get:
 *    description: Use to get all available areas
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/areas', authenticateToken, getAreas)

/**
 * @swagger
 * /users/:username/areas/:area_id:
 *  get:
 *    description: Use to get a specific area
 *    responses:
 *      '200':
 *        description: A successful response
 *       '400':
 *        description: Failed to retrieve area
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.get('/users/:username/areas/:area_id', authenticateToken, getArea)

/**
 * @swagger
 * /users/:username/areas/:area_id:
 *  post:
 *    description: Use to create an area
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Error parsing user's Areas
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.post('/users/:username/areas', authenticateToken, postArea)

/**
 * @swagger
 * /users/:username/areas/:area_id:
 *  patch:
 *    description: Use to update an area
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.patch('/users/:username/areas/:area_id', authenticateToken, patchArea)

/**
 * @swagger
 * /users/:username/areas/:area_id:
 *  delete:
 *    description: Use to delete an area
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.delete('/users/:username/areas/:area_id', authenticateToken, deleteArea)


/**
 * @swagger
 * /hooks:
 *  post:
 *    description: parse hooks handling
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: You need to signin to an account
 *      '498':
 *        description: Invalid token!
 */
app.post('/hooks', hookHandler)

app.get('/about.json', about)

app.post('/github', createGitHubHook)
app.get('/githublist', getGitHubHook)
app.delete('/delete/:id', deleteGitHubHook)



app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

ngrok.connect({
  proto : 'http',
  addr : PORT,
}, (err, url) => {
  if (err) {
      console.error('Error while connecting Ngrok',err);
      return new Error('Ngrok Failed');
  }
});
