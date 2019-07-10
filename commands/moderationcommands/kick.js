const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.

    if (!message.guild.member(message.author.id).hasPermission(["KICK_MEMBERS"])) return message.reply(`You need permissions to kick members to use this command`).then(msg => msg.delete(5000));
    if (!message.guild.member(Brie.user.id).hasPermission(["KICK_MEMBERS"])) return message.reply(`I don't have permissions enough to do this.`).then(msg => msg.delete(10000));
    let user = message.mentions.users.first() || message.guild.users.map(c => c.id == args[0])
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `The reason was not defined.`
    if (!user) return message.reply(`You need to say who I will kick by MENTION/ID`);

    try {
        message.guild.member(user).kick(reason)
    } catch (error) {
        console.log(error)
        return message.reply(`I got an err with this command, please fell free to report this bug at my guild (discord.gg/JWECGU8/) or send a message to my creator! Neable_#6565`);
    }

    Neable.createEmbed(message, {
        title: `${user.tag} has been kicked by ${message.author.tag}`,
        timestamp: true,
        image: `https://tenor.com/view/asdf-kick-gif-11029651`,
        footer: [`${reason}`]
    })

}


module.exports.help = {
    name: "kick",
    type: "moderation",
    description: "kick someone from the server.",
    usage: "b.kick [mention/id] [reason]",
    example: "b.kick @brie I'm just testing!!!",
    working: true
} 