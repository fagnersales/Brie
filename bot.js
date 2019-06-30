const Discord = require("discord.js");
const Brie = new Discord.Client({ fetchAllMembers: true });
const prefix = "b.";
const fs = require("fs");
const transform = require("./neable_module/NeableCommands");
mentionEmoji = "🍪";
timeout = new Set();
timeoutTime = 6000;
var mentionedBy;

Brie.commands = new Discord.Collection();

Brie.on('message', message => {
    if (message.channel.id === "594297217519714326" && message.author.id === '266645608960491521') {
        message.delete();
    }
})

fs.readdir("./commands", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    jsfiles.forEach((f, i) => {
        console.log(f);
        let props = require(`./commands/${f}`);
        Brie.commands.set(props.help.name, props)
    })
});


Brie.on("message", async message => {
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
        return message.channel.send(`Algo deu errado, consulte o console!`)
    }
});


Brie.on("raw", async event => {
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



Brie.login("NTc4MDY3MDU3MDA2ODcwNTY5.XQ5jCQ.RY7Adt3suH0dC2jFrMF0MzTl1E0");