const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "note",
    description: "Просмотр заметки/заметок",
    
    async execute(client, message, args, config, user) {

      let data = await client.notes.find({ userID: message.author.id })
      if(data.length <= 0) return client.error(`На вашем аккаунте, не было найдено заметок.`);
      let index = 0;
              
      let msg = await message.channel.send(new MessageEmbed().setColor(config.success).setAuthor(`Номер заметки: #${data[index].id}`, message.author.displayAvatarURL({ dynamic: true })).addField(`${config.content} Содержание заметки:`, `\`\`\`${client.functions.clean(data[index].text)}\`\`\``)); 
      msg.react("👈"); msg.react("🙏"); msg.react("👉");

      const collector = msg.createReactionCollector((r, m) => m.id == message.author.id, { time: 300000 });

      collector.on("collect", (r, u) => {
        if(r.emoji.name == "👉") {
          if(data.length <= index + 1) return;
          msg.edit(new MessageEmbed().setColor(config.success).setAuthor(`Номер заметки: #${data[index].id}`, message.author.displayAvatarURL({ dynamic: true })).addField(`${config.content} Содержание заметки:`, `\`\`\`${client.functions.clean(data[index].text)}\`\`\``))
          index++;
        }else if(r.emoji.name == "👈"){
          if(index <= 0) return;
          msg.edit(new MessageEmbed().setColor(config.success).setAuthor(`Номер заметки: #${data[index].id}`, message.author.displayAvatarURL({ dynamic: true })).addField(`${config.content} Содержание заметки:`, `\`\`\`${client.functions.clean(data[index].text)}\`\`\``))
          index--;
        }else if(r.emoji.name == "🙏") msg.reactions.removeAll().catch(err => r.users.remove(client.user.id))
      }) 

    }
}