const Discord = require('discord.js');
const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {

    FetchUser = args.join(" ");

    try {
        const userFound = await Brie.fetchUser(FetchUser)
        avatar = userFound.avatarURL.endsWith(".gif") ? avatar = userFound.avatarURL + "?size=2048" : avatar = userFound.avatarURL
        message.channel.send(new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`Simple Profile of: ${userFound.username}`)
            .addField('Name:', userFound.username)
            .addField('ID:', userFound.id)
            .addField('Discriminator:', "#" + userFound.discriminator)
            .setImage(avatar)
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL))
    } catch (error) {
        try {
            Brie.users.map((User) => {
                if (User.username === FetchUser || User.discriminator == FetchUser) {
                    avatar = User.avatarURL.endsWith(".gif") ? avatar = User.avatarURL + "?size=2048" : avatar = User.avatarURL
                    message.channel.send(new Discord.RichEmbed()
                        .setColor('RANDOM')
                        .setTitle(`Simple Profile of: ${User.username}`)
                        .addField('Name:', User.username)
                        .addField('ID:', User.id)
                        .addField('Discriminator:', "#" + User.discriminator)
                        .setImage(avatar)
                        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL))
                }
            })
        } catch (error) {
            message.reply(`I could not find that use, you can try another way to find him! Check in *\`b.help finduser\`*`)
        }
    }
}

module.exports.help = {
    name: "finduser",
    description: `Find an user on discord by ID`,
    usage: `b.finduser [ID]`,
    example: `b.finduser 578067057006870569`,
    working: true
}