const mongoose = require('mongoose');

const welcomeSchema = mongoose.Schema({
    welcomeServerID: String,
    welcomeChannelID: String,
    welcomeMessage: String
});

module.exports = mongoose.model('Welcome', welcomeSchema);