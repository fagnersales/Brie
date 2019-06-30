const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    Neable.sendMessage('EIS QUE KKKKKKKK 😂 😂 😂 😂 😂 😂 ', {
        message: message.channel,
        emojis: ['😎', '😂', '😅', '😄', '😃', '😁', '😬', '😀', '🙃', '😆']
    })
}

module.exports.help = {
    name: "eisque",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}