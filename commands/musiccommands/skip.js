const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // checar se o usuário esta em um canal de voz
    if (!message.member.voiceChannel) return message.reply(`Você não está em um canal de música...`);
    // se não estiver tocando musica no servidor
    if (!serverQueue) return message.reply(`Não tem nada tocando no momento...`);
    // dentro do canal de voz que estiver tocando, fazer a musica acabar.
    serverQueue.connection.dispatcher.end();
    // comando: tocando agora


}

module.exports.help = {
    name: "skip",
    type: "music",
    description: "Escolha o volume da música!",
    usage: "b.volume [valor]",
    example: "b.volume 5",
    working: true
}