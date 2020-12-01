const express = require('express')
const routes = require('./config/routes')
const expressApp = require('./config/express')
const { port } = require('./config/config')
// const { port, redis_port } = require('./config/config')
// const redis = require('redis')
// const client = redis.createClient(redis_port)

const app = express()

expressApp(app)
routes(app)



app.listen(port, () => {
    console.log(`FFL API is listening on port: ${port}`);
})