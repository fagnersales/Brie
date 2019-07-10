const Welcome = require('../../models/welcome.js');
const chalk = require('chalk');
const Neable = require('../../neable_module//NeableCommands')
module.exports.run = (Brie, message, args) => {
    var welcomeMessage
    options = ['{Membro} ', '{Contador} ', '{MembroID} ']
    if (args[0] == 'options') {
        return message.channel.send(`Opções para mensagem do servidor: ${options}`)
    }

    Welcome.findOne({
        welcomeServerID: message.guild.id
    }, (err, wc) => { // wc = Welcome Channel
        if (err) console.log(err);
        if (!wc) {
            if (!args[0]) return message.reply(`Você ainda não tem um canal de bem-vindo, para aprender como utilizar digite \`b.help welcomechannel\``);

            if (args[0] == 'setar' || args[0] == 'criar') {

                welcomeChannel = message.mentions.channels.first() || args[1];

                welcomeChannel = message.guild.channels.find(c => c.id === args[1] || c.id === welcomeChannel.id)

                if (!welcomeChannel) return message.reply(`Não pude encontrar este canal, tente utilizando ID ou MENCIONANDO!`);

                if (welcomeChannel.type !== 'text') return message.reply(`É necessário que seja um canal de texto!`);

                welcomeMessage = args.slice(2).join(' ');

                if (!welcomeMessage) return message.reply(`Você precisa setar uma mensagem de bem-vindo!`)

                if (!welcomeMessage.includes('{Membro}')) return message.reply(`É necessário informar onde ficará o nome do usuário utilizando a opção: {Membro} em algum lugar!`)

                const newWelcomeChannel = new Welcome({
                    welcomeServerID: message.guild.id,
                    welcomeChannelID: welcomeChannel.id,
                    welcomeMessage: welcomeMessage
                })

                newWelcomeChannel.save()
                    .then(() => {
                        message.reply(`Canal setado em: ${welcomeChannelID} com a mensagem: ${welcomeMessage}`)
                        console.log(`${chalk.bold.green('NEW')} | ${chalk.bold.blue(message.guild.name)} Setou um novo canal de bem-vindo!`);
                    }).catch((err) => console.log(err));
            }
        }
        if (wc && !args[0]) {
            return Neable.createEmbed(message, {
                field: [
                    ['Canal setado em:', `<#${wc.welcomeChannelID}>`],
                    ['Mensagem:', `${wc.welcomeMessage}`]
                ]
            })
        } else if (wc && args[0]) {
            if (args[0] == 'canal') {
                if (!args[1]) return message.reply(`Modifique o canal de boas vindas com ID ou MENÇÃO!`)

                welcomeChannel = message.mentions.channels.first() || args[2];

                wewelcomeChannel = message.guild.channels.find(c => c.id === args[2] || c.id === welcomeChannel.id)

                if (!welcomeChannel) return message.reply(`Não pude encontrar este canal, tente utilizando ID ou MENCIONANDO!`);

                if (welcomeChannel.type !== 'text') return message.reply(`É necessário que seja um canal de texto!`);

                wc.welcomeChannelID = welcomeChannel.id;

                wc.save()
                    .then(() => {
                        console.log(`${chalk.bold.green('NEW')} | ${chalk.bold.blue(message.guild.name)} Editou um novo canal de bem-vindo!`);
                        message.reply(`O canal agora está setado em: <#${welcomeChannel.id}>`);
                    }).catch((err) => console.log(err));
            } else if (args[0] == 'mensagem') {
                if (!args[1]) return message.reply(`Modifique a sua mensagem de boas vindas!`)

                welcomeMessage = args.slice(1).join(' ');

                if (!welcomeMessage) return message.reply(`Você precisa setar uma mensagem de bem-vindo!`)

                if (!welcomeMessage.includes('{Membro}')) return message.reply(`É necessário informar onde ficará o nome do usuário utilizando a opção: {Membro} em algum lugar!`)

                wc.welcomeMessage = welcomeMessage;
                wc.save()
                    .then(() => {
                        message.reply(`A mensagem agora está setada como: \`${welcomeMessage}\``)
                        console.log(`${chalk.bold.green('NEW')} | ${chalk.bold.blue(message.guild.name)} Editou um novo canal de bem-vindo!`)
                    }).catch((err) => console.log(err));
            }
        } 
    })



}
module.exports.help = {
    name: "welcomechannel",
    type: "moderation",
    description: "Escollha um canal para mensagem de boas-vindas",
    usage: "b.welcomechannel [channel] [message]",
    example: "b.welcomechannel #general Olá {Membro} seja bem-vindo",
    working: true
}