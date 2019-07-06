const Discord = require("discord.js");
const Brie = new Discord.Client({ fetchAllMembers: true });
const prefix = "b.";
const fs = require("fs");
const Neable = require('c:/Brie/neable_module/NeableCommands');
mentionEmoji = "🍪";
timeout = new Set();
timeoutTime = 60000;
const chalk = require('chalk');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://brielarson:2f0a1g1n2e5r12@cluster0-geqjm.mongodb.net/brie_system?retryWrites=true&w=majority', { useNewUrlParser: true })
const Money = require('./models/money.js');

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


Brie.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {
        coinsToAdd = Math.floor(Math.random() * 20) + 1;
        Money.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        }, (err, money) => {
            if (err) console.log(err);
            if (!money) {
                const newMoney = new Money({
                    userID: message.author.id,
                    serverID: message.guild.id,
                    money: coinsToAdd
                })

                newMoney.save()
                    .then(() => console.log(`Coins To Add: ${chalk.bold.green(coinsToAdd)} ${chalk.bold.green('NEW')} ${chalk.bold.blue(message.author.username)} foi adicionado à database!`))
                    .catch((err) => console.log(err));
            } else {
                money.money = money.money + coinsToAdd;
                money.save()
                    .then(() => console.log(`Coins To Add: ${chalk.bold.green(coinsToAdd)} ${chalk.bold.yellow('EDITED')} ${chalk.bold.blue(message.author.username)} foi atualizado na database!`))
                    .catch((err) => console.log(err));
            }

        })
    }

});

Brie.on("message", async message => {
    if (message.guild.id == '589795008467435521') {
        if (message.content.startsWith(prefix) && message.author.id !== '474407357649256448') {
            return message.reply(`Estou em fase de criação neste servidor, então só meu dono pode usar meus comandos!`).then(msg => msg.delete(6000))
        }
    }
    if (message.channel.id == '595025940158087189') {
        await message.react('👍')
        await message.react('👎')
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
        console.log(err);
        return message.channel.send(`Something goes wrong here, please fell free to report this bug at my guild *\`discord.gg/JWECGU8/\`* or send a message to my creator! \`Neable_#6565\``)
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

});


Brie.on('guildMemberRemove', member => {
    if (member.guild.id !== "594311437212450827") return;
    byeChannel = Brie.channels.get("595037720586485760");
    byeChannel.send(`Bye ${member.user.username} saudades do que a gente não viveu ainda :(`)
})

Brie.on('guildMemberAdd', member => {
    if (member.guild.id !== "594311437212450827") return;
    welcomeChannel = Brie.channels.get("595037720586485760");
    Neable.createEmbed({
        title: `Welcome ${member.user.username} to ${member.guild.name}!`,
        description: `Please, read the #faq and #rules before start using the server!
This guild isn't exactly just about Brie, you can make new friends here!

**Total members now: ${member.guild.memberCount}**`,
        thumbnail: `${member.user.avatarURL}`
    }).then(result => {
        welcomeChannel.send(result)
    })
});


Brie.login("NTc4MDY3MDU3MDA2ODcwNTY5.XQ5jCQ.RY7Adt3suH0dC2jFrMF0MzTl1E0");