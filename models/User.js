const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userID: String,
    
    notesCount: { type: Number, default: 1 },

});

module.exports = mongoose.model("User", schema)