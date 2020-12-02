const routes = require('../routes')
const { apiRootRoute } = require('./config')

module.exports = (app) => {
    app.use(apiRootRoute + 'players', routes.players)
    app.use(apiRootRoute + 'stats', routes.stats)
}