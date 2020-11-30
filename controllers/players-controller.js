const axios = require('axios')
const { databaseUrl } = require('../config/config')
const getAllPlayers = require('../utils/getAllPlayers')
const getAllUsers = require('../utils/getAllUsers')
const lightenPlayers = require('../utils/lightenPlayers')

const getPlayersMid = async (req, res, next) => {
    const players = await getAllPlayers()

    req.players = players
    next()
}

const lightPlayersMid = async (req, res, next) => {
    const players = req.players
    req.players = ''
    const users = await getAllUsers()
    // const users = usersResponse.data

    const lightenedPlayers = lightenPlayers(players, users)
    req.players = lightenedPlayers

    next()
}

module.exports = {
    getPlayersMid,
    lightPlayersMid
}