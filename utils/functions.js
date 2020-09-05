module.exports.clean = (text) => {
    return text.replace(/`/g, "'" + String.fromCharCode(8203));
}

module.exports.manipulation = (user) => {
    let a = this.client.channels.cache.get(user.channel)
    if(!a) this.client.users.cache.get(user.id).send(`<@${user.id}> => ${user.content}`).catch(err => err); else a.send(`<@${user.id}> => ${user.content}`);
    this.client.notifications.deleteOne({ _id: user._id }).catch(err => err); this.client.db.delete(user._id);
}