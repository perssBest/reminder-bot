const { Collection, MessageEmbed } = require('discord.js')
const core = require('./structure/core');
const config = require('./config.json')
const fs = require('fs')

bot = new core(process.env.TOKEN, process.env.mongodb, { disableEveryone: true, fetchAllMembers: false });
bot.login();

this.client = bot.client;
this.client.commands = new Collection();

fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        this.client.commands.set(command.name, command);
    }
})

this.client.on("message", async(message) => {

    this.client.error = (text) => { message.reply(new MessageEmbed().setColor(config.error).setDescription(text)) }
    this.client.success = (text) => { message.reply(new MessageEmbed().setColor(config.success).setDescription(text)) }

    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = this.client.commands.get(cmdName);
    if(!command) return;

    let user = await this.client.person.findOne({ userID: message.author.id });
    if(!user) { this.client.person.create({ userID: message.author.id }); return this.client.error(`Вас не было найдено в базе-данных, используйте команду повторно.`) }

    command.execute(this.client, message, args, config, user);

})