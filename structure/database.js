const Discord = require('discord.js');
const mongoose = require('mongoose');

class DataBase {
    constructor(url) {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.on('connected',() => {
            console.log('[ ✅ DataBase ] Successful connection!')
        })

        mongoose.connection.on('error',() => {
            console.log('[ ❎ DataBase ] Failed connection to database!')
        })

        this.url = url;

        this.notes = require("../models/Notes.js");
        this.person = require("../models/User.js");
        this.notifications = require("../models/Notifications.js");

    }
}

module.exports = DataBase;