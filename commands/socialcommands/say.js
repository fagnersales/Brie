const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {


    TestURL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

    messageContent = args.slice(0).join(" ");

    if (message.attachments.first()) return message.reply(`Archives isn't something to say...`);

    if (message.content.includes('@everyone') || message.content.includes('@here')) return message.reply('Are you trying to mention everyone??');

    if (message.mentions.roles.first()) return message.reply('Heey, I can not mention a role!');

    if (!messageContent) return message.reply(`You have to say something for me to say!`)

    TestURL.test(messageContent) ? err() : say(messageContent)

    function say(messageContent) {
        message.delete();
        message.channel.send(messageContent);
    }

    function err() {
        message.reply(`Sorry, I can not say links!`);
    }

}

module.exports.help = {
    name: "say",
    type: "social",
    description: "Makes me say something!",
    usage: "b.say [text]",
    example: "b.say Hello World!",
    working: true
}