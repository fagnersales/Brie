const Discord = require("discord.js");
const Brie = new Discord.Client({ fetchAllMembers: true });
const prefix = "b.";
const fs = require("fs");
const Neable = require('c:/Brie/neable_module/NeableCommands');
mentionEmoji = "🍪";
timeout = new Set();
timeoutTime = 6000;
const chalk = require('chalk');

Brie.commands = new Discord.Collection();

fs.readdir("./commands/leaguecommands", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    jsfiles.forEach((f, i) => {
        console.log(`${f} ${chalk.bold.green('League command has been loaded.')}`);
        let props = require(`./commands/leaguecommands/${f}`);
        Brie.commands.set(props.help.name, props)
    })
});

fs.readdir("./commands/moderationcommands", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    jsfiles.forEach((f, i) => {
        console.log(`${f} ${chalk.bold.green('Moderation command has been loaded.')}`);
        let props = require(`./commands/moderationcommands/${f}`);
        Brie.commands.set(props.help.name, props)
    })
});

fs.readdir("./commands/socialcommands", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    jsfiles.forEach((f, i) => {
        console.log(`${f} ${chalk.bold.green('Social command has been loaded.')}`);
        let props = require(`./commands/socialcommands/${f}`);
        Brie.commands.set(props.help.name, props)
    })
});

Brie.on("message", async message => {
    if (message.author.id !== "474407357649256448") return;
    
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
            mainChannel.send(new Discord.RichEmbed().setTitle("A message has been mentioned.").setDescription(`\`\`\`md\n#${m.content}\`\`\`\nMentioned By:${mentionedBy.username}`).setFooter("Message Author: " + m.author.username).setTimestamp(m.createdAt));
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