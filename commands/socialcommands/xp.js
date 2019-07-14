const Level = require('../../models/level.js');
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = (Brie, message, args) => {

    Usuario = message.mentions.members.first() || message.author

    Level.findOne({
        userID: Usuario.id,
        serverID: message.guild.id
    }, (err, xpSystem) => {
        if (err) console.log(err);
        if (!xpSystem) {
            return message.channel.send(`ERROR 404: Você ainda não tem nivel!`)
        } else {
            console.log(Usuario.nickname);

            return Neable.createEmbed(message, {
                title: `Usuário: ${Usuario.nickname}`,
                description: `XP: ${xpSystem.xp} / LEVEL: ${xpSystem.level}`,
                footer: [message.author.tag, message.author.displayAvatarURL]
            })
        }

    })

}

module.exports.help = {
    name: "xp",
    type: "social",
    description: "Veja seu nível atual no servidor!",
    usage: "b.xp | b.xp [MENÇÃO/ID]",
    example: "b.xp | b.xp @Brie",
    working: true
} 