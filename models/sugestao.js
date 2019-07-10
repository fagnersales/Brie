const mongoose = require('mongoose');

const sugestaoSchema = mongoose.Schema({
    serverID: String,
    channelID: String
});

module.exports = mongoose.model('Sugestao', sugestaoSchema);