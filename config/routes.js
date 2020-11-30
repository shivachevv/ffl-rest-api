const routes = require('../routes')
const { apiRootRoute } = require('./config')

module.exports = (app) => {
    app.use(apiRootRoute, routes.players)
    app.use(apiRootRoute, routes.stats)
}