const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userID: String,
    channelID: String,

    time: Number,
    text: String,

});

module.exports = mongoose.model("Notifications", schema)