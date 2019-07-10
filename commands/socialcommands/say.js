const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {


    TestarURL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

    messageContent = args.slice(0).join(" ");

    if (message.attachments.first()) return message.reply(`ERROR 401: Eu não posso repetir arquivos!`);

    if (message.content.includes('@everyone') || message.content.includes('@here')) return message.reply(`ERROR 505: Eu não posso todos do servidor!`);

    if (message.mentions.roles.first()) return message.reply('Heey, eu não posso mencionar cargos!');

    if (!messageContent) return message.reply(`ERROR 404: Não encontrei o que eu tenho que dizer...`)

    TestarURL.test(messageContent) ? err() : say(messageContent)

    function say(messageContent) {
        message.delete();
        message.channel.send(messageContent);
    }

    function err() {
        message.reply(`Me desculpe, mas não posso enviar links!`);
    }

}

module.exports.help = {
    name: "say",
    type: "social",
    description: "Me faça falar alguma coisa!",
    usage: "b.say [texto]",
    example: "b.say Oi, eu sou a Brie!",
    working: true
} 