const Discord = require('discord.js');
const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.
    if (message.guild.id !== "594311437212450827") return;

    roles = [];

    message.guild.roles.forEach((role) => {
        if (role.name.includes('everyone')) return;
        roles += (`#Name: ${role.name} ID: ${role.id}\n`)
    })

    message.channel.send(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Roles existing:')
    .setDescription(`\`\`\`md\n${roles}\`\`\``)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL))

}
    
module.exports.help = {
    name: "roles",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
} 