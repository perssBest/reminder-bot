const Discord = require('discord.js')
const mongoose = require('mongoose');
const database = require('./database');
const Klass = require('../structure/klass')
const functions = require('../utils/functions');

class Bot extends database {
    constructor(token, url, options) {
        super(url);
        this.token = token; this.options = options;
        this.client = new Discord.Client(this.options)
        this.client.db = new Discord.Collection();

        this.client.functions = functions;

        this.client.notes = this.notes; this.client.person = this.person; this.client.notifications = this.notifications;

        setTimeout(() => {
            this.client.notifications.find({} , (err, data) => {
                data.forEach(user => {
                    this.client.db.set(user._id, new Klass(user._id, user.userID, user.channelID, user.time, user.text));
                })
            })
        }, 1000)

        if (typeof this.token !== 'string' && this.token === null || this.token === undefined) {
            throw new Error('Token is not binded, provide token in main config file.');
        } 

        this.login = async () => {
            await this.client.login(this.token);
            await this.client.on('ready', async () => {

                this.client.db.forEach(user => {
                    if(user.time <= Date.now()) {
                        this.client.functions.manipulation(user)
                    }else{
                        setTimeout(() => {
                            this.client.functions.manipulation(user)
                        }, Date.now() - user.time)
                    }
                })

                await console.log(`[ ✅ CLIENT ] Successful connection to Discord API`)
            })
        }
    }
}

module.exports = Bot;
