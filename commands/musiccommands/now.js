const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // se nada estiver tocando no servidor
    if (!serverQueue) return message.reply(`Nada tocando no momento!`);
    return Neable.createEmbed(message, {
        field: [
            ['Tocando agora:', serverQueue.songs[0].title],
            ['URL:', serverQueue.songs[0].url]
        ],
        footer: ['test', message.author.displayAvatarURL]
    })
}

module.exports.help = {
    name: "now",
    type: "music",
    description: "Veja o que está tocando no momento!",
    usage: "b.now",
    example: "b.now",
    working: true
} 