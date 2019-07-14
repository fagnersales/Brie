const Discord = require('discord.js');
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = (Brie, message, args) => {

    EmbedDaMenção = new Discord.RichEmbed()

    EncontrarMensagem = args[0];

    if (!EncontrarMensagem) return message.reply('ERROR 400: Por favor, escolha uma forma para eu encontrar a mensagem! [LINK/ID]').then(msg => msg.delete(6000))

    response = args.slice(1).join(' ');
    message.delete();

    messageChannel = message.channel.id;

    URL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

    checkURL = URL.test(EncontrarMensagem) // if true = it is a link.

    checkID = isNaN(EncontrarMensagem) // if true = it is not a number.

    if (checkURL == true) {
        lastCharacter = EncontrarMensagem.charAt(EncontrarMensagem.length - 1);
        if (lastCharacter == '/') {

            lastCharacter = EncontrarMensagem.charAt(EncontrarMensagem.length - 2);
            messageChannel = EncontrarMensagem.slice(-38, -20)
            EncontrarMensagem = EncontrarMensagem.slice(-19, - 2)

        } else {

            lastCharacter = EncontrarMensagem.charAt(EncontrarMensagem.length - 1);
            messageChannel = EncontrarMensagem.slice(-37, -19)
            EncontrarMensagem = EncontrarMensagem.slice(-18, -1)
        }

        EncontrarMensagem = EncontrarMensagem + lastCharacter

    } else if (checkID == false) {
        EncontrarMensagem = EncontrarMensagem;
    }

    /*Colocar para dar fetch mesmo que o canal*/
    messageChannel = message.guild.channels.find(channel => channel.id == messageChannel)

    messageChannel.fetchMessage(EncontrarMensagem)
        .then(mensagemMencionada => {

            if (mensagemMencionada.author.bot) {
                return message.reply('Você não pode mencionar a mensagem de um bot!');
            }

            EmbedDaMenção = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter('Clique em 👁 depois de ler! (Será deletada automaticamente em 120s)')
            if (response) {
                EmbedDaMenção.setDescription(`Mensagem mencionada: \`\`\`md\n#${mensagemMencionada.author.username}: ${mensagemMencionada.content}\`\`\`
Resposta: \`\`\`md\n#${message.author.username}: ${response}\`\`\``)
            } else {
                EmbedDaMenção.setDescription(`\`Você também pode responder diretamente a mensagem colocando a resposta após o ID/LINK\`
Mensagem mencionada: \`\`\`md\n#${mensagemMencionada.author.username}: ${mensagemMencionada.content}\`\`\`
Mencionada por: ${message.author.username}`)
            }

            message.channel.send(EmbedDaMenção).then(EmbedDaMenção => {

                // mensagemMencionada.createReactionCollector()  finish it.
                EmbedDaMenção.react('👁');

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👁' && user.id === message.author.id || user.id === mensagemMencionada.author.id;
                }

                EmbedDaMenção.awaitReactions(filter, { max: 1, time: 120 * 1000, errors: ['time'] })
                    .then(() => {
                        EmbedDaMenção.delete()
                    })
                    .catch(() => {
                        EmbedDaMenção.delete()
                    })

            });

        }).catch((err) => {
            message.reply(`ERROR 404: Me desculpe mas não pude encontrar a mensagem. Tente novamente!`).then(msg => msg.delete(6000))
        })



}

module.exports.help = {
    name: 'mencionar',
    type: "social",
    description: 'Mencione uma mensagem!',
    usage: "b.mencionar [ID/LINK]",
    example: "b.mencionar 593177485139509279",
    working: true
} 