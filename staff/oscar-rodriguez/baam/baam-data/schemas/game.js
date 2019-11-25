const {Schema, ObjectId} = require ('mongoose')
const player = require('./player')
const shoot = require('.shoot')

module.exports = new Schema ({
    players: [player],
    shoots: [shoot],
    currentPlayer: Number
})