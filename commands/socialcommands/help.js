const Discord = require('discord.js');
const fs = require('fs');
const Neable = require('c:/Brie/neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {

    // ler todos os comandos 
    async function ListOfCommands() {
        var leagueCommands = '';
        leagueCount = 0;
        moreLeagueCommands = 0;
        var moderationCommands = '';
        moderationCount = 0;
        moreModerationCommands = 0;
        var socialCommands = '';
        moreSocialCommands = 0;
        socialCount = 0;
        var musicCommands = '';
        moreMusicCommands = 0;
        musicCount = 0;

        folders = fs.readdirSync('./commands/')
        folders.forEach(fold => {
            archives = fs.readdirSync(`./commands/${fold}`)
            archives.forEach(archive => {
                request = require(`../../commands/${fold}/${archive}`);
                let rh = request.help;
                // listar todos os comandos que estão funcionando e em seguida listar por tipos
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
                    else if (rh.type == 'music') {
                        musicCount++;
                        if (musicCount <= 2) {
                            musicCommands += (`\`\`b.${rh.name}\`\` | `);
                        } else if (musicCount > 3) {
                            moreMusicCommands++;
                        }
                    }
                }
            })
        })
        // criar embed
        const embed = await Neable.createEmbed({
            title: "Lista de Comandos:",
            field: [
                [`<:League:595322670023835674> League of Legends:`, `${leagueCommands}`],
                [`💬 Social:`, `${socialCommands} \`mais ${moreSocialCommands} comandos...\``],
                [`👮 Moderação:`, `${moderationCommands} \`mais ${moreModerationCommands} comandos...\``],
                [`🔊 Música:`, `\`b.play\` | ${musicCommands} \`mais ${moreMusicCommands} comandos...\``]
            ],
            footer: [`Requerido por: ${message.author.tag}`, message.author.displayAvatarURL]
        })
        // emojis 
        const emojis = [':League:595322670023835674', '💬', '👮', '🔊']

        sendEmbed()
        // enviar embed com reaction
        function sendEmbed() {

            Neable.sendMessage(embed, {
                message: message.channel,
                emojis: emojis
            }).then(msg => {

                const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id;

                const collector = msg.Message.createReactionCollector(filter, { max: 1, time: 60000 });

                collector.on('collect', (asd) => {
                    console.log(asd)
                })
            })
        }
    }

    async function SpecifiedCommand() {
        commandFound = false;
        folders = fs.readdirSync('./commands/')
        folders.forEach(fold => {
            archives = fs.readdirSync(`./commands/${fold}`)
            archives.forEach(archive => {
                if (archive == `${args[0]}.js`) {
                    request = require(`../../commands/${fold}/${archive}`)
                    if (request.help.working == true) {
                        commandFound = true;
                        message.channel.send(`Example: \`${request.help.example}\``)
                    }
                    if (request.help.specialNote) {
                        message.channel.send(`Note: ${request.help.specialNote}`)
                    }
                }
            })
        })

        if (commandFound == false) {

            return message.reply('Comando *`' + args[0] + '`* não encontrado. Você pode ver meus comandos digitando *`b.help`* ou clicando em: ➕').then(msg => {
                msg.react('➕')

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '➕' && user.id === message.author.id;
                }

                msg.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                    .then(() => { msg.delete(); ListOfCommands(); })

            })
        }

    }
    // enviar lista de todos os comandos
    if (!args[0]) ListOfCommands();
    // procurar comando com o nome especifico
    if (args[0]) SpecifiedCommand();

}

module.exports.help = {
    name: 'help',
    working: false
}