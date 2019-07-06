const Discord = require('discord.js');
const fs = require('fs');
const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = (Brie, message, args) => {


    var leagueCommands = '';
    leagueCount = 0;
    moreLeagueCommands = 0;
    var moderationCommands = '';
    moderationCount = 0;
    moreModerationCommands = 0;
    var socialCommands = '';
    moreSocialCommands = 0;
    socialCount = 0;

    function ListOfCommands() {
        folders = fs.readdirSync('./commands/')
        folders.forEach(fold => {
            archives = fs.readdirSync(`./commands/${fold}`)
            archives.forEach(archive => {
                request = require(`../../commands/${fold}/${archive}`);
                let rh = request.help;
                if (request.help.working == true) {
                    if (rh.type == 'league of legends') {
                        // league of legends commands
                        leagueCommands += (`\`\`b.${rh.name}\`\` |`)
                    }
                    else if (rh.type == 'social') {
                        socialCount++;
                        if (socialCount <= 3) {
                            socialCommands += (`\`\`b.${rh.name}\`\` | `)
                        } else if (socialCount > 3) {
                            moreSocialCommands++
                        }
                    }
                    else if (rh.type == 'moderation') {
                        moderationCount++;
                        if (moderationCount <= 3) {
                            moderationCommands += (`\`\`b.${rh.name}\`\` | `);
                        } else if (moderationCount > 3) {
                            moreModerationCommands++;
                        }
                    }
                }
            })
        })
        Neable.createEmbed(message, {
            title: "A list of my commands:",
            field: [
                [`<:League:595322670023835674> League Commands:`, `${leagueCommands}`],
                [`💬 Social Commands:`, `${socialCommands} \`more ${moreSocialCommands} commands...\``],
                [`👮 Moderation Commands:`, `${moderationCommands} \`more ${moreModerationCommands} commands...\``]
            ],
            footer: [`Requested by: ${message.author.tag}`, message.author.displayAvatarURL]
        })
    }









    if (!args[0]) {
        ListOfCommands();
    } else {
        try {
            folders = fs.readdirSync('./commands/')
            folders.forEach(fold => {
                archives = fs.readdirSync(`./commands/${fold}`)
                archives.forEach(archive => {
                    if (archive == `${args[0]}.js`) {
                        console.log('1asd')
                        request = require(`../../commands/${fold}/${archive}`)
                        if (request.help.working == true) {
                            message.channel.send(`Example: \`${request.help.example}\``)
                        }
                        if (request.help.specialNote) {
                            message.channel.send(`Note: ${request.help.specialNote}`)
                        }
                    }
                })
            })
        } catch (err) {
            console.log(err)
            return message.reply('Command *`' + args[0] + '`* not found. You can see all my commands using `b.help` or clicking in ➕').then(msg => {
                msg.react('➕')

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '➕' && user.id === message.author.id;
                }

                msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                    .then(() => { msg.delete(); ListOfCommands(); })

            })
        }
    }

}

module.exports.help = {
    name: 'help',
    working: false
}