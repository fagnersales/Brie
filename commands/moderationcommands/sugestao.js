const Sugestao = require('../../models/sugestao.js');
const chalk = require("chalk");
const Neable = require('../../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.

    if(!message.author.hasPermissions(['ADMINISTRATOR'])) return;
    if (!message.guild.member(Brie.user.id).hasPermission(['ADMINISTRATOR'])) return message.reply(`Preciso de permissões de administradora para fazer isto!`);
    Sugestao.findOne({
        serverID: message.guild.id
    }, (err, canalDeSugestoes) => {
        if (err) console.log(err);
        if (!canalDeSugestoes && !args[0]) {
            message.reply(`Este servidor não possui um canal de sugestões!`);
        } else if (!canalDeSugestoes && args[0]) {
            Canal = args[0];
            Canal = message.guild.channels.find(c => c.id === Canal);
            if (!Canal) return message.reply(`Não encontrei este canal.`)
            if (Canal.type !== 'text') return message.reply(`Precisa ser um canal de texto.`)

            const novoCanalDeSugestoes = new Sugestao({
                serverID: message.guild.id,
                channelID: Canal.id
            })

            novoCanalDeSugestoes.save()
                .then(() => {
                    message.reply(`O canal de sugestões foi setado em: ${Canal} e já está pronto para uso!`)
                    console.log(`${chalk.bold.green('NEW')} | ${chalk.bold.blue(message.guild.name)} Setou ${chalk.bold.blue(`${Canal.name}`)} como novo canal de sugestões!`);
                }).catch((err) => console.log(err));

        } else if (canalDeSugestoes && !args[0]) {
            message.reply(`O canal está setado em: <#${canalDeSugestoes.channelID}>`)
        } else if (canalDeSugestoes && args[0]) {
            console.log('atualizando canal de sugestões')
            canal = args[0];
            canal = message.guild.channels.find(c => c.id === canal);
            if (!canal) return message.reply(`ERROR 404: Canal não encontrado!`);
            if (canal.type !== 'text') return message.reply(`ERROR 401: Precisa ser um canal de texto!`);
            canalDeSugestoes.channelID = canal.id;
            canalDeSugestoes.save()
                .then(() => {
                    message.reply(`O canal de sugestões foi setado em: ${canal} e já está pronto para uso!`)
                    console.log(`${chalk.bold.orange('EDITED')} | ${chalk.bold.blue(message.guild.name)} Setou ${chalk.bold.blue(`${canal.name}`)} como novo canal de sugestões!`);
                }).catch((err) => console.log(err));
        }
    }) 
}

module.exports.help = {
    name: "sugestao",
    type: undefined,
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}