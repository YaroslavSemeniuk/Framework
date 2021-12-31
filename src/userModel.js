const { Schema, model } = require('mongoose')

const userModel = new Schema({
    name: String,
    age: Number,
})

module.exports = model('User', userModel)
