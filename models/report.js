const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    reportedBy: String,
    reportedByID: String,
    time: String
});

module.exports = mongoose.model('Report', reportSchema);