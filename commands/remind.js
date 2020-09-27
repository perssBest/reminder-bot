const { MessageEmbed, MessageCollector } = require('discord.js');
const ms = require('timestamp-to-ms')
const moment = require('moment')
const Klass = require('../structure/klass')

module.exports = {
    name: "remind",
    description: "Установить новое напоминание.",
    
    async execute(client, message, args, config, user) {

        let del = args.join(` `).split(`|`);

        if(!del[0] || !del[1] && isNaN(del[1])) return client.error(`Кажется вы забыли указать ${!del[0] ? `описание напоминания` : `время через которое активируется напоминание`}
        \`\`\`${config.prefix}${this.name} ${!del[0] ? `<hello> | <1h>` : `${del[0]} | <1h>`}\`\`\``)

        try{
            client.success(`Вы успешно создали напоминание которое сработает в **${moment(new Date(Date.now() + ms(del[1].trim()))).format(`HH:mm / YY.MM.DD`)}**`)
            client.notifications.create({ userID: message.author.id, time: Date.now() + ms(del[1].trim()), text: del[0], channelID: message.channel.id }).then(x => {
                setTimeout(() => {
                    message.channel.send(`${message.author} => ${del[0]}`, { allowedMentions: { parse: ['users'] } }).catch(err => message.author.send(`${message.author} => ${del[0]}`));
                    client.notifications.deleteOne({ _id: x._id }).catch(err => err);
                }, ms(del[1].trim()))
            })
        }catch(err){
            if(err.message == "Sorry, couldn't understand that time.") return message.channel.send(new MessageEmbed().setColor(config.error)
            .setImage(`https://media.discordapp.net/attachments/732211790804680814/751372426184491038/SR9RHVNfA9.gif`)
            .setDescription(`**Похоже вы указали не правильно время. Используйте подсказку которая находится ниже.**`));
        }

    }
}
