const Discord = require("discord.js");
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
  // Command here.
  let Links = [
    'https://cdn.discordapp.com/attachments/589795009147174925/595372035224502304/57177000_153094222386537_1268985050512864916_n.png',
    'https://cdn.discordapp.com/attachments/589795009147174925/595372035224502304/57177000_153094222386537_1268985050512864916_n.png',
    'https://cdn.discordapp.com/attachments/589795009147174925/595372035224502304/57177000_153094222386537_1268985050512864916_n.png'
  ] // set new links here..

  var mentioned = message.mentions.users.first()

  if (!mentioned) return message.channel.send(`Você precisa mencionar alguém.`)

  let random = Math.floor((Math.random() * Links.length));

  if (mentioned.id == "578067057006870569") return Neable.createEmbed(message, { description: 'Ownnt, boa noite para você também! :heart:', image: Links[random] })

  if (mentioned === message.author) return Neable.createEmbed(message, { description: 'Precisando de um boa noite? Boa noite!!! :heart:', image: Links[random] })

  Neable.createEmbed(message, {
    description: `**${message.author.username}** desejou boa noite para **${mentioned.username}**`,
    image: Links[random],
    footer: [`Reaja com 🤗 para desejar boa notie também!`, `${mentioned.displayAvatarURL}`]
  }).then(async msg => {

    msg.messageWithEmbed.react('🤗')

    let filter = (reaction, user) => reaction.emoji.name === "🤗" && user.id === mentioned.id;

    const collector = msg.messageWithEmbed.createReactionCollector(filter, { max: 1, time: 60000 });

    collector.on("collect", () => {
      Neable.createEmbed(message, {
        description: `**${mentioned.username}** desejou boa noite para **${message.author.username}** também!`,
        image: Links[random],
        timestamp: true,
        footer: [`${mentioned.username}`, `${mentioned.displayAvatarURL}`]
      })
    })
  })
} 

module.exports.help = {
  name: "boanoite",
  type: "social",
  description: "Deseje boa noite para alguém!",
  usage: "b.goodnight [usuario]",
  example: "b.goodnight @Brie",
  working: true
}