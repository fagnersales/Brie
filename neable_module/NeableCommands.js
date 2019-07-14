const discord = require('discord.js');
const NeableEvents = require('./NeableEvents.js');
const chalk = require('chalk');

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

    if (options.footer) {
        if (options.footer.length == 2) {
            Embed.setFooter(options.footer[0], options.footer[1]);
        } else if (options.footer.length == 1 && options.footer[0] !== 'default') {

        }
        if (options.footer[0] == 'default') {

            Embed.setFooter(message.author.tag, message.author.displayAvatarURL)

        }

    } else {

        options.footer ? options.footer.length == 2 ? Embed.setFooter(options.footer[0], options.footer[1]) : Embed.setFooter(options.footer[0]) : false

    }

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
/**
 * Se começar com o segundo parametro retorna true se não false;
 */
module.exports.startswith = (mensagemDoUsuario, ComecaCom, sensibilidade = false) => {


    mensagem = mensagemDoUsuario.slice(ComecaCom.length);

    if (sensibilidade == true) {
        ComecoDaMensagem = mensagemDoUsuario.slice(0, ComecaCom.length);

        if (ComecoDaMensagem === ComecaCom) {
            console.log(`\n${textOrange("COM SENSIBILIDADE")} "${textBlue(ComecoDaMensagem)}" é compatível com: "${textBlue(ComecaCom)}"`)
            return mensagem;
        } else {
            return false;
        }

    }
    if (sensibilidade == false) {

        data = mensagemDoUsuario.toLowerCase()

        if (data.startsWith(ComecaCom)) {

            console.log(`\n${textOrange("SEM SENSIBILIDADE")} "${textBlue(data)}" é compatível com: "${textBlue(ComecaCom)}"`)
            if (mensagem.length == 0) {
                return true
            } else {
                return mensagem
            }

        } else {
            return false;
        }
    }
}

module.exports.ArrayRemove = (array, index) => {

    if (typeof (array) == Array) {
        return console.log(`Primeiro parametro precisa ser array`);
    };

    if (isNaN(index)) {
        return console.log(`Segundo parametro precisa ser numérico`);
    }

    if (index > array.length) {
        return console.log(`Index maior que a quantidade de elementos (${array.length})`);
    }

    position = 0;
    newArray = [];
    array.forEach(result => {

        position++;

        if (position == index) return;

        newArray.push(result);
    })

    return newArray;
}

module.exports.ArrayAdd = (array, index, data) => {

    position = 0;
    newArray = [];

    if (typeof (array) == Array) {
        return console.log(`Primeiro parametro precisa ser array`);
    };

    if (isNaN(index)) {
        return console.log(`Segundo parametro precisa ser numérico`);
    };

    if (index > array.length) {
        newArray = array;

        console.log(`Index maior que array, adicionando como último elemento.`)
        
        newArray.push(data);
        
        return newArray;
    } else {
        array.forEach(result => {
            position++;

            if (position == index) newArray.push(data);

            newArray.push(result);

        });

        return newArray;
    }
}

module.exports.createID = (tamanho) => {
    let code = "";

    str = '0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    
    for (let i = 0; i < tamanho; i++) {
       
        random = Math.floor(Math.random() * str.length);
        
        code += (str[random]); 

    }

    return code;
}

Array.prototype.teste = function () {
    for (i = 0; i < this.length; i++) {
        this[i] = this[i].toUpperCase();
    }
};

module.exports.blue = (data) => {
    return chalk.bold.blue(data);
}

module.exports.orange = (data) => {
    return chalk.bold.yellow(data);
}

module.exports.yellow = (data) => {
    return chalk.bold.yellow(data);
}

module.exports.green = (data) => {
    return chalk.bold.green(data);
}

module.exports.red = (data) => {
    return chalk.bold.red(data);
}

module.exports.test = () => {

    NeableEvents.connected();

}

function textBlue(data) {
    return chalk.bold.blue(data);
}

function textOrange(data) {
    return chalk.bold.yellow(data);
}

function textGreen(data) {
    return chalk.bold.green(data);
}

function textRed(data) {
    return chalk.bold.red(data);
}