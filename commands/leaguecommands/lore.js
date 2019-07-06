const Neable = require('../../neable_module/NeableCommands.js')
const request = require('request');
const Discord = require("discord.js");
module.exports.run = async (Brie, message, args) => {
    // Command here.
    name = args[0];

    request('http://ddragon.leagueoflegends.com/cdn/9.13.1/data/pt_BR/champion/' + name + '.json', function (err, response, body) {
        if (!err && response.statusCode == 200) {
            json = JSON.parse(body)

            lore = " " + json.data[`${name}`].lore

            message.channel.send(new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle(`Lore da(o) campeã(o) ${name}, ${json.data[`${name}`].title}`)
                .setDescription(lore))
        } else {
            message.channel.send(`Não utilize espaços ou ' para procurar pelo campeão! \`Ex: Kai'Sa = Kaisa | Lee Sin = Leesin\``)
        }
    })
}

module.exports.help = {
    name: "lore",
    type: "league of legends",
    description: "Get the lore of a champion!",
    usage: "b.lore [name]",
    example: "b.lore Yasuo",
    working: true
}