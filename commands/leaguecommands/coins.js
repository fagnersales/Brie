const Money = require('../../models/money.js');

module.exports.run = (Brie, message, args) => {
    let user = message.mentions.members.first() || message.author;
    Money.findOne({
        userID: user.id,
        serverID: message.guild.id
    }, (err, money) => {
        if(err) console.log(err);
        if(!money) {
            return message.channel.send(`you don't have money yet!`)
        } else {
            return message.channel.send(`your money: ${money.money}`)
        }
    
    })

}

module.exports.help = {
    name: "coins",
    type: "league of legends",
    description: "Get the lore of a champion!",
    usage: "b.lore [name]",
    example: "b.lore Yasuo",
    working: false
}