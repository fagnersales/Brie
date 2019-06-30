const Discord = require('discord.js');
const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const newEmbed = Neable.createEmbed({ title: `Getting Started!` })
    message.channel.send(newEmbed);
    setTimeout(() => { doYouKnow() }, 2000)



    async function doYouKnow() {
        message.channel.send(`First of all, if it's your first time just use *\`help list\`* to get a help of all things that you can do!`)
        const filter = m => m.author.id === message.author.id;
        const setOptions = new Discord.MessageCollector(message.channel, filter, { max: 999, time: 300000 });

        setOptions.on('collect', collected => {
            messageCollected = collected.content.toLowerCase();
            if (messageCollected.startsWith('help list')) {
                Neable.createEmbed(message, {
                    timestamp: false,
                    title: 'All things that you can do in EMBED!',
                    field: [
                        ['title: ', 'Set title to embed'], // XX
                        ['description: ', 'Set description to embed'], // XX
                        ['color: ', 'Set a specific color `(hexcolor)` to embed'], // XX
                        ['footer: ', 'Set footer'],
                        ['image: ', 'Set an image'],
                        ['thumbnail: ', 'Set a thumbnail'],
                        ['timestamp', 'Set  timestamp']
                    ],
                    footer: [`You can see a gif of the command using: b.help embed [title/color/footer...]`, `${message.author.displayAvatarURL}`]
                })
            }

            

        })

    }


}

module.exports.help = {
    name: "embed",
    description: `Creates a beautiful embed using simple messages!`,
    usage: `b.embed`,
    example: `b.embed`,
    working: true
}