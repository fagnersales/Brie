const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    message.delete();
    message.channel.send(args.slice(0).join(" "))
    
}

module.exports.help = {
    name: "update",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}