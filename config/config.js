const env = process.env.ENV || 'development'

const config = {
    development: {
        port: process.env.PORT || 5000,
        secret: "I_SHOT_JFK",
        databaseUrl: 'https://ffl-3-new.firebaseio.com/',
        apiRootRoute: '/api/'
    },
    production: {}
};

module.exports = config[env]