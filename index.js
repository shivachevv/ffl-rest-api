const express = require('express')
const routes = require('./config/routes')
const expressApp = require('./config/express')
const { port } = require('./config/config')

const app = express()

expressApp(app)
routes(app)

app.listen(port, () => {
    console.log(`FFL API is listening on port: ${port}`);
})