const nm = require('../neable_module/NeableCommands')
module.exports.run = async (Brie, message, args) => {

    //if (!args) return;
    const devID = "474407357649256448";
    const Discord = require('discord.js');

    if (message.author.id !== devID) return;
    
    try {
        let evalArgs = args.join(" ");
        let result = eval(evalArgs);

        if (typeof result !== 'string')
            result = require('util').inspect(result, { depth: 0 });
        
        let embed = new Discord.RichEmbed()
        .setColor('#C542F4')
        .setDescription(`Saida\n\`\`\`js\n${result}\`\`\`\n`)

  message.channel.send(embed)
    } catch(e) {
        message.channel.send(e);
    }
}

module.exports.help = {
    name: 'eval'
}