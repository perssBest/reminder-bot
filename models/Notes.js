const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userID: String,
    
    id: Number,
    text: String,

});

module.exports = mongoose.model("Notes", schema)