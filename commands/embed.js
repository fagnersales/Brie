const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    message.channel.send(`Vamos começar!`);
}
    
module.exports.help = {
    name: "embed",
    description: `Creates a beautiful embed using simple messages!`,
    usage: `b.embed`,
    example: `b.embed`,
    working: true
}