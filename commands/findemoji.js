const Discord = require('discord.js');
const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    
    async function EmojiList() {
        
        
        let largest = (arr) => (arr.reduce((r, c) => r.length >= c.length ? r : c)).length;
        
        function espacos(emojiList, size = 20) {
            if (emojiList.length < size) {
                emojiList = emojiList + ([...Array(size - emojiList.length)]).map(() => ' ').join('');
            }
            
            return emojiList;
        }
        
        function extractMax(array, size = 2048) {
            let total = 8;
            let response = [];
            
            for (let i = 0; i < array.length; i++) {
                if (total + (array[i].length + 1) < size) {
                    total += array[i].length + 1;
                    response.push(array[i]);
                }
            }
            
            return response.join('\n');
        }
        
        const emojis = [];
        
        Brie.emojis.map((emoji) => {
            if (emoji.name.includes(args[0])) {
                emojis.push(emoji);
            }
        })
        if (!emojis.length) return message.reply(`I could not find any emoji with that name...`)
        
        let size = largest(emojis.map(emoji => emoji.name));
        let emojiList = extractMax(emojis.map(emoji => `# Name: ${espacos(emoji.name, size)}  |  ID: ${emoji.id} #`));
        
        
        message.channel.send(new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('Emojis that I found:')
        .setDescription(`\`\`\`md\n${emojiList}\`\`\``)
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL));
        
    }

    async function useEmoji(ID) {
        Brie.emojis.map((emoji) => {
            if (emoji.id === ID) {
                emoji.animated ? message.reply(`<a:${emoji.name}:${emoji.id}>`) : message.reply(`<:${emoji.name}:${emoji.id}>`)
            }
        })
    }
    if (!args[0]) return message.reply(`You need to specifiy what I need to do, if you don't know, type *\`b.help findemoji\`*`)
    args[0] == "use" ? useEmoji(args[1]) : EmojiList();

}

module.exports.help = {
    name: "findemoji",
    description: `Find an emoji on my system!`,
    usage: `b.findemoji [name] | b.findemoji use [ID]`,
    example: `b.findemoji [prefix] | b.findemoji use 594342426949320739`,
    working: true
}