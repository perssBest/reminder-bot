const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports = {
    name: "help",
    description: "Список всех доступных команд бота",
    
    async execute(client, message, args, config, user) {
      
      message.channel.send(new MessageEmbed().setColor(config.success).setDescription(client.commands.map(x => `\`${x.name}\` - ${x.description || "Данная команда не имеет описания"}`))
      .addField(`Другая информация:`, `- [Добавить бота на свой сервер](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\n- [Исходный код](https://github.com/perssBest/reminder-bot)\n- [Сервер помощи](https://discord.gg/RPb2KXN)`))
      
    }
}