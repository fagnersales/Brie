const Neable = require('../../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    let pingDoBot = new Date() - message.createdAt;

    Neable.createEmbed(message, {
        title: "🏓 Pong:",
        field: [
            ['BOT: ', Math.floor(pingDoBot) + 'ms'],
            ['API: ', Math.floor(Brie.ping) + 'ms'],
        ],
        footer: ['default'],
        timestamp: true
    });
}
    
module.exports.help = {
    name: "ping",
    type: "moderation",
    description: "Veja o meu ping!",
    usage: "b.ping",
    example: "b.ping",
    working: true
}