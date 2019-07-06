const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    let updateChannel;

    message.guild.channels.forEach((channel) => {
        if (channel.id == '594325695392382996') {
            updateChannel = channel;
        }
    });

    function newUpdate() {
        if (message.author.id !== "474407357649256448") return;

        // message.delete();

        let newVersion;

        newVersion = args[0];

        updateChannel.setTopic(`Version ${newVersion}`);

        commitUpdate = args.slice(1).join(" ");

        message.delete();

        updateChannel.send(`[ @everyone ]\nNew update has been sent!\n ${commitUpdate}\n\`[version ${newVersion}]\``)
    }

    function sendVersion() {
        message.channel.send(`${updateChannel.topic}`)
    }

    args[0] ? newUpdate() : sendVersion();

}

module.exports.help = {
    name: "update",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}