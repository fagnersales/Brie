const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // se nada estiver tocando no servidor
    if (!serverQueue) return message.reply(`Nada tocando no momento!`);
    return message.reply(`Tocando agora: **${serverQueue.songs[0].title}**`);

}

module.exports.help = {
    name: "now",
    type: "music",
    description: "Escolha o volume da música!",
    usage: "b.volume [valor]",
    example: "b.volume 5",
    working: true
}