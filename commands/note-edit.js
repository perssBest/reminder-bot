const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports = {
    name: "note-edit",
    description: "Изменить существующую заметку",
    
    async execute(client, message, args, config, user) {

        if(!args[0] || isNaN(args[0])) return client.error(`Укажите номер заметки в которой хотите изменить контент.`);

        let note = await client.notes.findOne({ id: args[0], userID: message.author.id });
        if(!note) return client.error(`На вашем аккаунте, не было найдено заметки под номером **#${args[0]}**`);

        client.success(`Время пошло, у вас есть 5 минут чтоб написать следующим сообщением новое содержание заметки.`)

        const collector = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 300000, errors: ["time"] })
        
        if(!collector.size) return client.error(`Время на изменение вышло. Попробуйте еще раз ¯\\\_(ツ)_/¯`)
        
        note.text = collector.first().content; note.save()
        client.success(`Ваша заметка под номером **#${args[0]}** была обновлена.`)
      
    }
}