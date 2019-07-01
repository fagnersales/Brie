const Discord = require('discord.js');
const Neable = require('c:/Brie/neable_module/NeableCommands');

module.exports.run = (Brie, message, args) => {


    mentionEmbed = new Discord.RichEmbed()

    findMessage = args[0];

    if (!findMessage) return message.reply('Please, choose some way to get the message [LINK or ID]').then(msg => msg.delete(6000))

    response = args.slice(1).join(' ');
    message.delete();

    messageChannel = message.channel.id;

    findMessageURL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

    checkURL = findMessageURL.test(findMessage) // if true = it is a link.

    checkID = isNaN(findMessage) // if true = it is not a number.
    if (checkURL == true) {
        lastCharacter = findMessage.charAt(findMessage.length - 1);
        if (lastCharacter == '/') {

            lastCharacter = findMessage.charAt(findMessage.length - 2);
            messageChannel = findMessage.slice(-38, -20)
            findMessage = findMessage.slice(-19, - 2)

        } else {

            lastCharacter = findMessage.charAt(findMessage.length - 1);
            messageChannel = findMessage.slice(-37, -19)
            findMessage = findMessage.slice(-18, -1)
        }

        findMessage = findMessage + lastCharacter

    } else if (checkID == false) {
        findMessage = findMessage;
    }

    /*Colocar para dar fetch mesmo que o canal*/
    messageChannel = message.guild.channels.find(channel => channel.id == messageChannel)


    messageChannel.fetchMessage(findMessage)
        .then(messageMentioned => {

            if (messageMentioned.author.bot) {
                return message.reply('You can not mention a message from bot.');
            }


            embedMention = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setFooter('React this message after you read the same! (will be deleted in 120s)')
            if (response) {
                embedMention.setDescription(`Message Mentioned: \`\`\`md\n#${messageMentioned.author.username}: ${messageMentioned.content}\`\`\`
Response: \`\`\`md\n#${message.author.username}: ${response}\`\`\``)
            } else {
                embedMention.setDescription(`\`You can also answer the message putting after the ID/LINK\`
Message Mentioned: \`\`\`md\n#${messageMentioned.author.username}: ${messageMentioned.content}\`\`\`
Mentioned By: ${message.author.username}`)
            }

            message.channel.send(embedMention).then(embedMentioned => {


                // messageMentioned.createReactionCollector()  finish it.
                embedMentioned.react('👁');

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👁' && user.id === message.author.id || user.id === messageMentioned.author.id;
                }

                embedMentioned.awaitReactions(filter, { max: 1, time: 120 * 1000, errors: ['time'] })
                    .then(() => {
                        embedMentioned.delete()
                    })
                    .catch(() => {
                        embedMentioned.delete()
                    })

            });

        }).catch((err) => {
            message.reply(`Sorry but I couldn't find the message by this way, try another way or check the LINK/ID`).then(msg => msg.delete(6000))
        })



}

module.exports.help = {
    name: 'mention',
    description: 'Mention a message',
    usage: `b.mention [ID/LINK]`,
    example: `b.mention 593177485139509279`,
    working: true
}