// const axios = require('axios')
// const { databaseUrl } = require('../config/config')
const getAllPlayers = require('../utils/getAllPlayers')
const getAllUsers = require('../utils/getAllUsers')
const lightenPlayers = require('../utils/lightenPlayers')
const uploadPlayers = require('../utils/uploadPlayers')
// const redisClient = require('../config/redis')
const deleteLightPlayers = require('../utils/deleteLightPlayers')

const getPlayersMid = async (req, res, next) => {

    // // GET PLAYERS FROM REDIS IF ANY
    // redisClient.get('players', async (err, data) => {
    //     if (err) throw err

    //     if (data !== null) {
    //         req.players = JSON.parse(data)
    //         req.cache = true
    //         console.log(1, new Date());
    //         next()
    //     } else {
    //         const players = await getAllPlayers()

    //         // REDIS
    //         redisClient.set('players', JSON.stringify(players))

    //         req.players = players
    //         req.cache = false
    //         console.log(2, new Date());
    //         next()
    //     }
    // })

    const players = await getAllPlayers()
    console.log('players');
    // REDIS
    // redisClient.set('players', 'JSON.stringify(players)')

    req.players = players
    // req.cache = false
    // console.log(2, new Date());
    next()


}

const lightPlayersMid = async (req, res, next) => {
    // const players = { req }
    const players = req.players
    req.players = ''
    const users = await getAllUsers()

    // console.log(3, new Date());
    const lightenedPlayers = lightenPlayers(players, users)
    req.players = lightenedPlayers

    // console.log(4, new Date());
    console.log('lightplayers mid');

    next()
    // redisClient.get('players', (err, data) => {
    //     if (err) throw err

    //     req.cache = data
    //     next()
    // })

}

const uploadLightPlayersMid = async (req, res, next) => {
    const lightPlayers = req.players

    await deleteLightPlayers()
    console.log('upload');

    await uploadPlayers('light', lightPlayers)

    next()
}

module.exports = {
    getPlayersMid,
    lightPlayersMid,
    uploadLightPlayersMid
}