const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // checar se o usuário esta em um canal de voz
    if (!message.member.voiceChannel) return message.reply(`Você não está em um canal de música...`);
    // se nada estiver tocando no servidor
    if (!serverQueue) return message.reply(`Nada tocando no momento!`);
    // se não houver args[1] retornar o valor do vlume
    if (!args[0]) return message.reply(`O volume atual está em: ${serverQueue.volume}`);
    
    volumes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    // mudar o volume
    if (!volumes.includes(args[0])) {
        return message.reply(`Você só pode escolher um valor entre 0 e 10!`);
    };

    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    // salvar o novo valor do volume
    serverQueue.volume = args[0];
    // reenvair a mensagem :d
    return message.channel.send(`O volume ficou setado em: **${args[0]}**`);

}

module.exports.help = {
    name: "volume",
    type: "music",
    description: "Escolha o volume da música!",
    usage: "b.volume [valor]",
    example: "b.volume 5",
    working: true
}