const Neable = require('../../neable_module/NeableCommands.js');
const index = require('../../bot');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    const serverQueue = index.queue.get(message.guild.id);
    // se nada estiver tocando no servidor
    if (!serverQueue) return message.reply(`Nada tocando no momento!`);
    indexNumber = 0;
    songs = '';
    moreMusics = 0;
    serverQueue.songs.map(song => {
        if (serverQueue.songs.length == 1) {
            songs = 'Nenhuma música na fila.'
            return
        }
        indexNumber++;
        if (indexNumber > 15) {
            moreMusics++;
            return;
        }

        if (serverQueue.songs[0]) {
            return;
        } else {
            songs += (`**${indexNumber}** ${song.title} \n`);
        }
    });

    if (moreMusics > 0) {
        songs += (`\n Mais ${moreMusics} músicas na fila`)
    }

    Neable.createEmbed(message, {
        title: `Lista de músicas:`,
        description: `${songs}
            
Tocando agora: ${serverQueue.songs[0].title}`
    })

}

module.exports.help = {
    name: "queue",
    type: "music",
    description: "Veja as músicas que estão na fila!",
    usage: "b.queue",
    example: "b.queue",
    working: true
} 