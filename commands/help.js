const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = (Brie, message, args) => {
    var text = '';

    function ListOfCommands() {
        files = fs.readdirSync('./commands/')
        files.forEach(file => {

            request = require(`./${file}`);

            if (request.help.working == true) {

                text += (`\n<:prefix:594342426949320739> ${request.help.name} | ${request.help.description}\nUsage: \`${request.help.usage}\``)

            }
        });

        message.channel.send(new Discord.RichEmbed()
            .setTitle('Commands')
            .setColor('RANDOM')
            .setTimestamp()
            .setDescription(text))
    }

    if (!args[0]) {
        ListOfCommands();
    } else {
        try {
            request = require(`../commands/${args[0]}.js`);
        } catch (err) {
            return message.reply('Command *`'+ args[0] + '`* not found. You can see all my commands using `b.help` or clicking in 🍪').then(msg => {
                msg.react('🍪')

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🍪' && user.id === message.author.id;
                }

                msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                    .then(() => { msg.delete(); ListOfCommands(); })

            })
        }

        if (request.help.working == true) {
            message.channel.send(`🍪 Example: \`${request.help.example}\``)
        }
    }

}

module.exports.help = {
    name: 'help',
    working: false
}