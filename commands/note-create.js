const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "note-create",
    description: "Создать новую заметку",
    
    async execute(client, message, args, config, user) {

        let text = args.join(` `);
        if(!text) return client.error(`Укажите содержание вашей заметки.`);

        let note = await client.notes.create({ id: user.notesCount, text: text, userID: message.author.id });

        client.success(`Вы успешно создали заметку под номером **#${user.notesCount}**`);
        user.notesCount++; user.save();

    }
}