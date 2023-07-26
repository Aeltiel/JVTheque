const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    userId : {type : String, required : true},
    game : {type : String, required : true},
    plateforme : {type : String, required : true},
    obtention : {type : String, required : true}
})
module.exports = mongoose.model('Game', gameSchema);