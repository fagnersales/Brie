const fs = require('fs');
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {

    // ler todos os comandos 
    function sendSpecificHelp(theme) {

        let themeHelp = "";

        pasta = fs.readdirSync(`./commands/${theme}`);
        pasta.forEach(arquivo => {
            request = require(`../../commands/${theme}/${arquivo}`);
            if (request.help.working === false) return;
            themeHelp += (`**${request.help.name.toUpperCase()}** | __${request.help.description}__
\`${request.help.usage}\`\n\n`)
        })

        Neable.createEmbed(message, {
            description: themeHelp
        })
    }

    async function ListOfCommands() {


        var ComandosDeLOL = '';
        contadorLOL = 0;
        MaisComandosDeLOL = 0;

        var ComandosDeMODERACAO = '';
        contadorMODERACAO = 0;
        MaisComandosDeMODERACAO = 0;

        var ComandosDeSOCIAL = '';
        MaisComandosDeSOCIAL = 0;
        contadorSOCIAL = 0;

        var ComandosDeMUSICA = '';
        MaisComandosDeMUSICA = 0;
        contadorMUSICA = 0;

        pastas = fs.readdirSync('./commands/')
        pastas.forEach(pasta => {
            arquivos = fs.readdirSync(`./commands/${pasta}`)
            arquivos.forEach(arquivo => {
                request = require(`../../commands/${pasta}/${arquivo}`);
                let rh = request.help;
                // listar todos os comandos que estão funcionando e em seguida listar por tipos
                if (request.help.working == true) {
                    if (rh.type == 'league of legends') {
                        // league of legends commands
                        ComandosDeLOL += (`\`\`b.${rh.name}\`\` |`)
                    }
                    else if (rh.type == 'social') {
                        contadorSOCIAL++;
                        if (contadorSOCIAL <= 3) {
                            ComandosDeSOCIAL += (`\`\`b.${rh.name}\`\` | `)
                        } else if (contadorSOCIAL > 3) {
                            MaisComandosDeSOCIAL++
                        }
                    }
                    else if (rh.type == 'moderation') {
                        contadorMODERACAO++;
                        if (contadorMODERACAO <= 3) {
                            ComandosDeMODERACAO += (`\`\`b.${rh.name}\`\` | `);
                        } else if (contadorMODERACAO > 3) {
                            MaisComandosDeMODERACAO++;
                        }
                    }
                    else if (rh.type == 'music') {
                        contadorMUSICA++;
                        if (contadorMUSICA <= 2) {
                            ComandosDeMUSICA += (`\`\`b.${rh.name}\`\` | `);
                        } else if (contadorMUSICA > 3) {
                            MaisComandosDeMUSICA++;
                        }
                    }
                }
            })
        })
        // criar embed

        MaisComandosDeLOL > 1 ? textoLOL = `${ComandosDeLOL} \`mais ${MaisComandosDeLOL} comandos...\`` : textoLOL = `${ComandosDeLOL}`;
        MaisComandosDeSOCIAL > 1 ? textoSOCIAL = `${ComandosDeSOCIAL} \`mais ${MaisComandosDeSOCIAL} comandos...\`` : textoSOCIAL = `${ComandosDeSOCIAL}`;
        MaisComandosDeMODERACAO > 1 ? textoMODERACAO = `${ComandosDeMODERACAO} \`mais ${MaisComandosDeMODERACAO} comandos...\`` : textoMODERACAO = `${ComandosDeMODERACAO}`;
        MaisComandosDeMUSICA > 1 ? textoMUSICA = `${ComandosDeMUSICA} \`mais ${MaisComandosDeMUSICA} comandos...\`` : textoMUSICA = `${ComandosDeMUSICA}`


        const embed = await Neable.createEmbed({
            title: "Lista de Comandos:",
            field: [
                [`<:League:595322670023835674> League of Legends:`, `${textoLOL}`],
                [`💬 Social:`, `${textoSOCIAL}`],
                [`👮 Moderação:`, `${textoMODERACAO}`],
                [`🔊 Música:`, `\`bb.play\` | ${textoMUSICA}`]
            ],
            footer: [`${message.author.tag} Reaja para mais informações!`, message.author.displayAvatarURL]
        })
        // emojis 
        const emojis = [':League:595322670023835674', '💬', '👮', '🔊']
        const emojisFilter = ['♥']

        sendEmbed()
        // enviar embed com reaction
        function sendEmbed() {

            Neable.sendMessage(embed, {
                message: message.channel,
                emojis: emojis
            }).then(result => {
                msg = result.Message;

                const filter = (reaction, user) => !emojisFilter.includes(reaction.emoji.name) && user.id === message.author.id;

                const collector = msg.createReactionCollector(filter, { max: 1, time: 60000 });

                collector.on('collect', (collected) => {

                    emojiName = collected.emoji.name;

                    console.log(`${Neable.blue('COLLECTED')} | Um emoji foi coletado: ${emojiName}`);

                    switch (emojiName) {

                        case "League": sendSpecificHelp("leaguecommands");
                            break;

                        case "💬": sendSpecificHelp("socialcommands");
                            break;

                        case "👮": sendSpecificHelp("moderationcommands");
                            break;

                        case "🔊": sendSpecificHelp("musiccommands");
                            break;
                        default: message.reply(`O que está tentando fazer? 🤔`);
                    }
                })
            })
        }
    }

    async function SpecifiedCommand() {
        comandoEncontrado = false;
        pastas = fs.readdirSync('./commands/')
        pastas.forEach(pasta => {
            arquivos = fs.readdirSync(`./commands/${pasta}`)
            arquivos.forEach(arquivo => {
                if (arquivo == `${args[0]}.js`) {
                    request = require(`../../commands/${pasta}/${arquivo}`)
                    if (request.help.working == true) {
                        comandoEncontrado = true;
                        message.channel.send(`Exemplo: \`${request.help.example}\``)
                    }
                    if (request.help.specialNote) {
                        message.channel.send(`Nota: ${request.help.specialNote}`)
                    }
                }
            })
        })

        if (comandoEncontrado == false) {

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