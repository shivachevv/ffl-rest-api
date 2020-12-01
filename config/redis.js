const { port, redis_port } = require('./config')
const redis = require('redis')
const client = redis.createClient(redis_port)

module.exports = client