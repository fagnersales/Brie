const Level = require('../../models/level.js');
const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = (Brie, message, args) => {
    let user = message.mentions.members.first() || message.author;
    Level.findOne({
        userID: user.id,
        serverID: message.guild.id
    }, (err, xpSystem) => {
        if (err) console.log(err);
        if (!xpSystem) {
            return message.channel.send(`you don't have money yet!`)
        } else {
            return Neable.createEmbed(message, {
                title: 'XP de ' + user.user.username,
                description: `XP: ${xpSystem.xp} / LEVEL: ${xpSystem.level}`,
                footer: [message.author.tag, message.author.displayAvatarURL]
            })
        }

    })

}

module.exports.help = {
    name: "xp",
    type: "social",
    description: "Veja seu nível e xp!",
    usage: "b.xp [user]",
    example: "b.xp | b.xp @Brie",
    working: true
}