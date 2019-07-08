const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // checar se o usuário esta em um canal de voz
    if (!message.member.voiceChannel) return message.reply(`Você não está em um canal de música...`);
    // se não estiver tocando musica no servidor
    if (!serverQueue) return message.reply(`Nada tocando no momento...`);
    // transforma a lista de musicas em nada.
    serverQueue.songs = [];
    // finaliza a musica que está tocando agora.
    serverQueue.connection.dispatcher.end();
    // sair do canal de voz que o membro utilizou o comando
    message.member.voiceChannel.leave();


}

module.exports.help = {
    name: "stop",
    type: "music",
    description: "Escolha o volume da música!",
    usage: "b.volume [valor]",
    example: "b.volume 5",
    working: true
}