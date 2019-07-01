const discord = require('discord.js');
const NeableEvents = require('./NeableEvents.js');
/**
 * Transform your string in CharCode
 * @param {string} content Put your text here.
 * @example
 * MODULE.StringToCharCode('Cake')
 * .then((result) => console.log(result))
 */
module.exports.StringToCharCode = async (content) => {
    StringInCharCode = []

    for (let x = 0; x < content.length; x++) {
        cc = content.charCodeAt(x)
        StringInCharCode.push(cc)

    }

    return StringInCharCode;

}
/**
 * Transform a CharCode in String
 * @param {array} charCode [array] Put your code here as an array.
 * @example
 * MODULE.CharCodeToString([67, 97, 107, 101])
 * .then((result) => console.log(`Your result: ${result}`))
 */
module.exports.CharCodeToString = async (charCode = []) => {
    content = ''
    charCode.map((code) => {
        character = String.fromCharCode(code)
        content += character
    })
    return content
}

module.exports.countdown = async (number) => {
    for (let i = 1; i < number; i++) {
        console.log(i)
    }

}
/**
 * Send a message into a specific channel
 * @param {string} content [string] The content that will be sent.
 * @param {string} [options.message] Where the message will be sent
 * @param {string} [options.emojis=[]] Emojis to react the message.
 * @returns {Message|Emoji} Message/Emoji
 * @example
 * MODULE.sendMessage("Hello World", {
 * message: message.channel,
 * emojis: ['🍎', '🍪']
 * });
 */
module.exports.sendMessage = async (content, options) => {
    if (!content) throw new Error('Missing param "text" | You need set a content to be sent.');
    if (!options.message) throw new Error('Missing param "options.message" | You need set where the message will be sent.')
    const haveEmojis = (options.emojis ? true : false);
    const Message = await options.message.send(content)
    if (haveEmojis) {
        for (let i = 0; i < options.emojis.length; i++) {
            await Message.react(options.emojis[i])
        }

        Emoji = options.emojis;

        return { Message, Emoji }
    }
}
/**
 * Check if a string is a Link.
 * @param {string} content [string] The link to be check.
 * @returns {boolean} boolean / true if is a link.
 * @example
 * const validateURL = MODULE.isLink('https://www.example.com/')
 * console.log(validateURL) // returns true
 */
module.exports.isLink = (content) => {
    isLink = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
    isLink = isLink.test(content)
    return isLink;
}

/**
 * Check if a string is an E-mail.
 * @param {string} content [string] The Email to be check.
 * @returns {boolean} boolean / true if is a link.
 * @example
 * const validateEmail = MODULE.isEmail('Brieexample.com')
 * console.log(validateEmail) // returns false
 */
module.exports.isEmail = (content) => {
    isEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm)
    isEmail = isEmail.test(content)
    return isEmail;
}
/**
 * @example
 * MODULE.helpByGif(message, {
    title: 'Hello World',
    footer: {
        text: `Requested by: ${message.author.tag}`,
        icon: message.author.displayAvatarURL
    },
    gif: 'LINK GIF HERE'
})
 */
module.exports.helpByGif = (message, options = {}) => {
    helpGif = new discord.RichEmbed()
        .setTitle(options.title)
        .setImage(options.gif)
        .setFooter(options.footer.text, options.footer.icon)
        .setColor('RANDOM')

    if (!options.message) {
        message.channel.send(helpGif)
    } else {
        return helpGif;
    }
}
/**Create a embed, follow this example:
 * @example
 * MODULE.createEmbed(message, {
    title: 'Hello',
    description: 'description',
    field: [['Text one', 'Sub-text one'], ['hello', 'wolrd']],
    footer: {
        text: `Resqueted by: ${message.author.tag}`,
        icon: message.author.displayAvatarURL
    },
    image: 'link here'
})
 */
module.exports.createEmbed = async (message, options = {}) => {

    if (message instanceof require('discord.js').Message) {
        message = message;
        options = options;
    } else {
        options = message;
    }

    Embed = new discord.RichEmbed()
        .setColor('RANDOM')

    options.title ? Embed.setTitle(options.title) : false

    options.description ? Embed.setDescription(options.description) : false

    options.timestamp ? Embed.setTimestamp() : false

    options.footer ? options.footer.length == 2 ? Embed.setFooter(options.footer[0], options.footer[1]) : Embed.setFooter(options.footer[0]) : false

    options.thumbnail ? Embed.setThumbnail(options.thumbnail) : false

    if (options.image) {
        if (this.isLink(options.image)) {
            Embed.setImage(options.image)
        } else {
            console.log(`Invalid link at image:`)
        }
    }

    if (options.field) {
        for (let field of options.field) {
            Embed.addField(field[0], field[1])
        }
    }

    if (message instanceof require('discord.js').Message) {
        const messageWithEmbed = await message.channel.send(Embed)
        return { EmbedContent: Embed, messageWithEmbed: messageWithEmbed }
    } else {
        return Embed
    }

}

module.exports.test = () => {

    NeableEvents.connected();

}






