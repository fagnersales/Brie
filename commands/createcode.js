const fs = require('fs');
const neable = "474407357649256448";
const Neable = require('../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {

    if (message.author.id !== neable) return message.reply('You can not do that.').then(msg => msg.delete(2000))

    name = args[0];
    code = args.slice(1).join(" ");
    if (!code) {
        code = "";
    }

    Neable.sendMessage(`Your code \`${name}.js\` is  going to be created`, {
        message: message.channel
    }).then(() => {

        fs.writeFileSync(`./commands/${name}.js`, `const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    ${code}
}
    
module.exports.help = {
    name: "${name}",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}`)
    })



}

module.exports.help = {
    name: "createcode",
    description: "Create a new js command",
    usage: "b.CreateCode [name]",
    example: "b.CreateCode ping",
    working: true
}

