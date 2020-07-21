const Discord = require("discord.js");
const { Util } = require('discord.js');
const Brie = new Discord.Client({ fetchAllMembers: true });
const prefix = "b.";
const fs = require("fs");
const Neable = require('./neable_module/NeableCommands');
mentionEmoji = "🍪";
const TimeoutEXP = new Set();
const ytdl = require('ytdl-core');
timeout = new Set();
timeoutTime = 60000;
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.connect('some good uri =D')
const Level = require('./models/level.js');
const Welcome = require('./models/welcome.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAy5k-WCovjhCtJ8naRM88dOIMiRqw2XVw');
let queue = new Map();
// const BrieBR = new Discord.Client({ fetchAllMembers: true });
// BrieBR.login('NTk1ODg2OTkxODYyOTIzMjc0.XRxhbA.d-Ahihs9tDRzTJDRhXstlJSPyUY')

Brie.commands = new Discord.Collection();

fs.readdir("./commands/", (err, folders) => {
    if (err) console.error(err);
    folders.forEach((fold) => {
        fs.readdir(`./commands/${fold}`, (err, archives) => {
            archives.forEach((f) => {
                console.log(`The command: ${f} ${chalk.bold.green('has been loaded.')} in the folder: ${chalk.bold.blue(`${fold}`)}`)
                let props = require(`./commands/${fold}/${f}`);
                Brie.commands.set(props.help.name, props);
            });
        });
    });
});


// add exp by messages.
Brie.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {

        if (TimeoutEXP.has(message.author.id)) {
            return;
        } else {
            TimeoutEXP.add(message.author.id);

            xpToAdd = Math.floor(Math.random() * 60) + 1;
            Level.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, xpSystem) => {
                if (err) console.log(err);
                if (!xpSystem) {
                    const newXP = new Level({
                        userID: message.author.id,
                        serverID: message.guild.id,
                        xp: xpToAdd,
                        level: 1
                    })

                    newXP.save()
                        .then(() => console.log(`xp to add: ${chalk.bold.green(xpToAdd)} | ${chalk.bold.green('NEW')} ${chalk.bold.blue(message.author.username)} foi adicionado à database!`))
                        .catch((err) => console.log(err));
                } else {
                    xpSystem.xp = xpSystem.xp + xpToAdd;
                    if (xpSystem.xp > xpSystem.level * 100) {
                        xpSystem.level = xpSystem.level + 1;
                        console.log(`${chalk.bold.green('LEVEL UP')} ${message.author.username} subiu para o nível ${xpSystem.level}`)
                    }
                    xpSystem.save()
                        .then(() => console.log(`xp to add: ${chalk.bold.green(xpToAdd)} ${chalk.bold.yellow('EDITED')} ${chalk.bold.blue(message.author.username)} foi atualizado na database!`))
                        .catch((err) => console.log(err));
                }
                setTimeout(() => {
                    TimeoutEXP.delete(message.author.id);
                }, 60000)

            })

        }

    } else {
        return;
    }

});

Brie.on('message', async message => {
    if (message.channel.type == 'dm') return;
    const Sugestao = require('./models/sugestao.js');
    Sugestao.findOne({
        serverID: message.guild.id
    }, async (err, canal) => {
        if (err) console.log(err);
        if (canal) {
            if (message.channel.id == canal.channelID) {
                await message.react('👍');
                await message.react('👎');
            }
        }
    })
})

Brie.on("message", async message => {
    if (message.guild.id == '589795008467435521') {
        users = ['453697694339301376', '474407357649256448']
        if (message.content.startsWith(prefix) && !users.includes(message.author.id)) {
            return message.reply(`Estou em fase de criação neste servidor, então só meu dono pode usar meus comandos!`).then(msg => msg.delete(6000))
        }
    }

    if (message.author.bot || message.channel.type === "dm") return;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
    let command;
    if (Brie.commands.has(cmd)) {
        command = Brie.commands.get(cmd)
    }
    if (!message.content.startsWith(prefix)) return;
    try {
        command.run(Brie, message, args)
    } catch (err) {
        console.log(err.message)
    }
});


Brie.on("raw", async event => {
    var mentionedBy;

    if (event.t == "MESSAGE_REACTION_ADD" && event.d.emoji.name === mentionEmoji) {
        user = Brie.users.get(event.d["user_id"]);
        if (user.bot) return;
        mainChannel = Brie.channels.get(event.d["channel_id"]);
        mainChannel.fetchMessage(event.d["message_id"]).then(async m => {

            if (m.author.bot) return;
            m.reactions.forEach(react => {
                mentionedBy = react.users.last()
            });
            if (timeout.has(mentionedBy.id)) {
                return mainChannel.send(`${mentionedBy}Please wait a few moment to mention again.After it mention the message again.`).then(msg => {
                    msg.delete(6000)
                })
            } else {
                timeout.add(mentionedBy.id)
            }
            embed = await Neable.createEmbed({
                title: `A message has been mentioned.`,
                description: `\`\`\`md\n#${m.content}\`\`\`\nMentioned By: ${mentionedBy.username}`,
                footer: [`Message Author: ${m.author.username}`],
                timestamp: true
            })
            mainChannel.send(embed)
            setTimeout(() => {
                timeout.delete(mentionedBy.id)
            }, timeoutTime)
        })
    } else {
        return
    }
});
Brie.on("message", async message => {
    if (message.author.bot) return; // se o author da menasgem for um bot
    if (message.channel.type == "dm") return; // se a mensagem vier do privado (dm) retorna;
    if (message.content.startsWith('<@494998062461353988>')) {

        message.channel.send(new Discord.RichEmbed()
            .setTitle(`Olá ${message.author.tag} está perdido?`)
            .setDescription('Opa, se você se encontra com dúvidas doque eu posso fazer diriga-se rápidamente a um chat de comandos e digite: ' + '`s!ajuda`')
            .setThumbnail(Brie.user.avatarURL)
            .setFooter(`</AlekkiBOT> © Todos os direitos reservados.`, message.author.avatarURL))
    }
})

Brie.on('ready', () => {
    const figlet = require('figlet');

    figlet('Brie Bot', function (err, data) {
        if (err) throw err;
        console.log(chalk.bold.blue(data))
    })
    console.log('\n\n')
    console.log(`${chalk.bold.green.bold('All Brie Information in (discord.js)')}`)
    console.log(`Loading Brie connections...`)
    console.log(`API ${chalk.bold.green('WORKING')}`)

    console.log(`DISCORD.JS ${chalk.bold.green('WORKING')}`)
    console.log(`SERVERS ${chalk.bold.green('WORKING')}`)
    console.log(`USERS ${chalk.bold.green('WORKING')}`)
    console.log(`EMOJIS ${chalk.bold.green('WORKING')}`)
    console.log(`\nLoading Brie information size...`)

    console.log(`SERVERS SIZE = ${chalk.bold.green(Brie.guilds.size)}`)
    console.log(`USERS SIZE = ${chalk.bold.green(Brie.users.size)}`)

    console.log(`\nLoading Brie Information...`)
    console.log(`BOT USERNAME: ${chalk.bold.blue(Brie.user.tag)}`)
    console.log(`BOT ID: ${chalk.bold.blue(Brie.user.id)}`)


    console.log(`\nLoading Brie's Server Information...`)
    server = Brie.guilds.get('594311437212450827')
    console.log(`SERVER ${chalk.bold.green('WORKING')}`)
    console.log(`USERS SIZE ${chalk.bold.green(server.memberCount)}`)
    console.log(`INVITE LINK ${chalk.bold.blue('https://discord.gg/JWECGU8')}`)

    let list = [
        { name: `b. | Em ${Brie.guilds.size} servidores!`, type: 'PLAYING' },
        { name: `b. | Em ${Brie.channels.size} canais!`, type: 'PLAYING' },
        { name: `b. | Com ${Brie.users.size} usuários!`, type: 'PLAYING' },
    ];

    function randomize() {
        let random = list[Math.floor(Math.random() * list.length)];
        Brie.user.setPresence({ game: random });
    }

    setInterval(() => { randomize() }, 20000)

});

Brie.on('guildMemberRemove', member => {
    if (member.guild.id !== "594311437212450827") return;
    byeChannel = Brie.channels.get("595037720586485760");
    byeChannel.send(`Bye ${member.user.username} saudades do que a gente não viveu ainda :(`)
})

Brie.on('guildMemberAdd', member => {
    Welcome.findOne({
        welcomeServerID: member.guild.id
    }, (err, wc) => {
        if (err) console.log(err)
        if (!wc) {
            console.log(`doesn't exist`)
        } else {
            welcomeChannel = member.guild.channels.find(c => c.id === wc.welcomeChannelID)
            welcome = wc.welcomeMessage.replace('{Membro}', member)
            welcomeChannel.send(welcome)
        }
    })
});
// objeto de musicas

Brie.on('message', async (message) => {
    // args padrão
    const args = message.content.split(" ")
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(message.guild.id);

    //economizar espaço
    mc = message.content;
    if (mc.startsWith('bb.play')) {
        // canal de voz que o usuário está
        voiceChannel = message.member.voiceChannel;
        // se não estiver 
        if (!voiceChannel) return message.reply(`Você precisa entrar em um canal de voz para tocar músicas!`);
        // permissões do canal de voz sobre o bot
        const permissions = voiceChannel.permissionsFor(message.client.user);
        // se não tiver a permissão connect
        if (!permissions.has('CONNECT')) return message.reply(`Eu não posso entrar neste canal de voz...`);
        // se não tiver a permissão speak
        if (!permissions.has('SPEAK')) return message.reply(`Eu não posso falar neste canal de voz...`);
        // checar se é um link do youtube com playlist
        if (url.match(/^https:?\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            // buscar a playlist pela url
            const playlist = await youtube.getPlaylist(url);
            // buscar os videos da playlist
            const videos = await playlist.getVideos();
            // para cada video
            for (const video of Object.values(videos)) {
                // receber o id de cada video
                const video2 = await youtube.getVideoByID(video.id);
                // chamar a função com plyalist = true enviando os videos recebidos
                handleVideo(video2, message, voiceChannel, true);
            }
            console.log('b')
            return message.channel.send(`A playlist **${playlist.title}** foi adicionada à lista de músicas!`)
        } else {
            try {
                // tentar pegar o vide pela url
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    // se não conseguir tentar pelas palavras
                    var videos = await youtube.searchVideos(searchString, 5);
                    Neable.createEmbed(message, {
                        title: `Seleção de Música:`,
                        description: `${videos.map((video2, i) => `${i + 1} [${video2.title}](${video2.url})`).join('\n')}
                        
                        Escolha uma das músicas pelo número correspondente!`
                    });
                    try {
                        message.channel.awaitMessages(msg2 => msg2.author.id === message.author.id, {
                            max: 1,
                            time: 15000,
                            errors: ['time']
                        }).then((response) => {
                            if (response.message.content.includes(['1', '2', '3', '4', '5'])) {
                                return message.channel.send(`Valor inválido, cancelando a seleçãode música.`)
                            }
                        })
                    } catch (err) {
                        console.error(err);
                        return message.channel.send(`Valor inválido, cancelando a seleção de música.`)
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    // se não conseguir e retornar erro
                } catch (error) {
                    return message.reply(`Não encontrei nenhuma música com este nome...`);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
        // musica encontrada com id titulo e url
    }
})

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    const songRequested = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    }
    // se não estiver tocando neste servidor
    if (!serverQueue) {
        // criar um objeto com estas coias ai
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        // salvar dentro de queue, o constructor dentro do id do servidor
        queue.set(message.guild.id, queueConstruct);
        // adicionar em songs a musica requerida
        queueConstruct.songs.push(songRequested);
        try {
            // função conectar no canal que o usuário está (Voice Channel)
            var connection = await voiceChannel.join();
            // salvar dentro do queue constructor
            queueConstruct.connection = connection;
            // chamar a função com os parametros [servidor | primeira música]
            playTheSong(message.guild, queueConstruct.songs[0]);
            // dps que tocar a musica
            await Neable.createEmbed(message, {
                title: `Começando a tocar!`,
                description: `(${songRequested.title})[${songRequested.url}]`
            })
            // se não conseguir conectar
        } catch (error) {
            console.log(error);
            // deletar o servidor de dentro do constructor²
            queue.delete(message.guild.id);
            return message.reply(`Não consegui me conectar ao canal de voz.`);
        };
    } else {
        // se já estiver tocando, apenas slavar a musica que foi requerida
        serverQueue.songs.push(songRequested);
        // retornar a mensagem de que a musica foi requerida + informações dela.
        if (playlist) return
        else return Neable.createEmbed(message, {
            title: `Nova música adicionada!`,
            description: `(${songRequested.title})[${songRequested.url}]`
        })
    }

}
// função para começar a tocar música
function playTheSong(guild, songRequested) {
    // buscar dentro do serverQueue o servidor com este ID
    const serverQueue = queue.get(guild.id);
    // se não houver mais músicas
    if (!songRequested) {
        // sair do canal que está dentro do serverQueue
        serverQueue.voiceChannel.leave();
        // deletar o servidor de dentro do constructor
        queue.delete(guild.id);
        // finish.
        return;
    }
    // tocar a música dentro do canal salvado no constructor
    const dispatcher = serverQueue.connection.playStream(ytdl(songRequested.url));
    // receber evento de fim da musica
    dispatcher.on('end', () => {
        // remover a primeira música (no caso a que acabou de tocar)
        serverQueue.songs.shift();
        if (serverQueue.songs.length >= 1) {
            // chamando a função novamente com a primeira música.
            playTheSong(guild, serverQueue.songs[0]);

        } else if (serverQueue.songs.length == 0) {
            // sair do canal de voz que foi conectado anteriormente
            queue.delete(guild.id);
            voiceChannel.leave();
        }

    });
    // receber evento de erro
    dispatcher.on('error', (error) => console.log(error));
    // volume da música que está sendo tocada.
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

module.exports.queue = queue;

Brie.login("NTc4MDY3MDU3MDA2ODcwNTY5.XQ5jCQ.RY7Adt3suH0dC2jFrMF0MzTl1E0");
