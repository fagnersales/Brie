const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    if (message.author.id !== message.guild.ownerId) return; 
    // Command here.
    async function clearChannel(channel, n = 0, old = false) {
        let collected = await channel.fetchMessages();
        if (collected.size > 0) {
            if (old) {
                for (let msg of collected.array()) {
                    await msg.delete();
                    n++;
                }
            } else {
                let deleted = await channel.bulkDelete(100, true);
                if (deleted.size < collected.size) old = true;
                n += deleted;
            }
            return n + await clearChannel(channel, old);
        } else return 0;
    }
 
    clearChannel(message.channel)
}

module.exports.help = {
    name: "clearall",
    type: "moderation",
    description: "Delete todas as mensagens de um canal!",
    usage: "b.clearall",
    example: "b.clearall",
    working: true
}