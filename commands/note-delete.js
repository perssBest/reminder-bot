const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "note-delete",
    description: "Удалить существующую заметку",
    
    async execute(client, message, args, config, user) {

        if(!args[0] || isNaN(args[0])) return client.error(`Укажите номер заметки которую хотите удалить.`);

        let note = await client.notes.findOne({ id: args[0], userID: message.author.id });
        if(!note) return client.error(`На вашем аккаунте, не было найдено заметки под номером **#${args[0]}**`);

        client.notes.deleteOne({ id: args[0], userID: message.author.id }).catch(err => err);
        client.success(`Вы успешно удалили заметку под номером **#${args[0]}**`)

    }
}