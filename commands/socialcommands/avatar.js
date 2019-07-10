const Discord = require('discord.js');
const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    var user = false;

    if (!args[0]) {
        user = message.author;
    } else {
        try {
            user = await Brie.fetchUser(args[0]);
        } catch (error) {
            user = message.mentions.users.first();
        }
    }

    if (!user) return message.reply('Houve um erro na identificação do usuario!').then(msg => msg.delete(3000));

    var avatar = (user.displayAvatarURL.endsWith("gif") ? avatar = `${user.displayAvatarURL}?size=2048` : avatar = `${user.displayAvatarURL}`);

    avatarEmbed = new Discord.RichEmbed()
        .setImage(avatar)
        .setColor('RANDOM')

    user === message.author ? avatarEmbed.setFooter('Você está vendo seu próprio avatar!', message.author.displayAvatarURL) : avatarEmbed.setFooter(`Você está vendo o avatar de: ${user.tag}`, message.author.displayAvatarURL)

    message.channel.send(avatarEmbed)
}

module.exports.help = {
    name: "avatar",
    type: "social",
    description: "Veja o avatar de um usuário!",
    specialNote: "Você pode ver usuários de qualquer lugar do DISCORD, mas só funcionam com o ID.",
    usage: "b.avatar [ID/MENÇÃO]",
    example: "b.avatar @Brie",
    working: true
} 