const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {

    if (message.attachments.first()) return message.reply(`Archives isn't something to say...`);

    TestURL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

    messageContent = args.slice(0).join(" ");

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
    description: "Makes me say something!",
    usage: `b.say [content]`,
    example: `b.say Hello World!`,
    working: true
}