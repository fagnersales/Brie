const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    if (!message.guild.member(message.author.id).hasPermission(["BAN_MEMBERS"])) return message.reply(`You need permissions to ban members to use this command!`).then(msg => msg.delete(5000));
    if (!message.guild.member(Brie.user.id).hasPermission(["BAN_MEMBERS"])) return message.reply(`I don't have permissions enough to do this.`).then(msg => msg.delete(10000));
    let user = message.mentions.users.first() || message.guild.users.map(c => c.id == args[0])
    if (user == message.author) return message.reply(`Why do you want to ban yourself? `)
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `The reason was not defined.`
    if (!user) return message.reply(`You need to say who I'll ban by MENTION/ID`);
 
    try {
        message.guild.member(user).ban(reason)
    } catch (error) {
        console.log(error)
        return message.reply(`I got an err with this command, please fell free to report this bug at my guild (discord.gg/JWECGU8/) or send a message to my creator! Neable_#6565`);
    }

    Neable.createEmbed(message, {
        title: `${user.tag} has been banned by ${message.author.tag}`,
        timestamp: true,
        image: `https://tenor.com/view/asdf-kick-gif-11029651`,
        footer: [`${reason}`]
    })
}

module.exports.help = {
    name: "ban",
    type: "moderation",
    description: "Ban someone from the server!",
    usage: "b.ban [MENTION/ID] [reason]",
    example: "b.ban @brie I am just testing again!",
    working: true
}