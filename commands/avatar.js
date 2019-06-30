const Discord = require('discord.js');
const Neable = require('../neable_module/NeableCommands.js')
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

    user === message.author ? avatarEmbed.setFooter('You are seeing your own avatar!', message.author.displayAvatarURL) : avatarEmbed.setFooter(`You are seeing the avatar of: ${user.tag}`, message.author.displayAvatarURL)

    message.channel.send(avatarEmbed)
}

module.exports.help = {
    name: "avatar",
    description: "See the avatar of an user!",
    specialNote: "You can see users out of the server, but just works with his ID.",
    usage: `b.avatar [ID/MENTION] `,
    example: `b.avatar @Brie`,
    working: true
}