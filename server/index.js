const restify = require('restify')
const server = restify.createServer()
const PORT = 4000
const corsMiddleware = require('restify-cors-middleware')

// Middleware
server.use(restify.plugins.bodyParser())

let cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['X-App-Version', 'Authorization'],
  exposeHeaders: []
})

server.pre(cors.preflight)
server.use(cors.actual)

server.listen(process.env.PORT || 4000, () => {
  console.log('Successfully stared at localhost:' + PORT)
  require('./routes/root')(server)
})
