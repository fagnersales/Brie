const Sugestao = require('../../models/sugestao.js');
const Neable = require('../../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.

    if (!message.member.hasPermissions(['ADMINISTRATOR'])) return;

    if (!message.guild.member(Brie.user.id).hasPermission(['ADMINISTRATOR'])) return message.reply(`Preciso de permissões de administradora para fazer isto!`);

    console.log(`${Neable.blue('STARTING')} | Ativando um comando de sugestão no banco de dados!`)

    Sugestao.findOne({

        serverID: message.guild.id

    }, (err, canalDeSugestoes) => {

        if (err) console.log(err);

        if (!canalDeSugestoes && !args[0]) {

            console.log(`${Neable.red('ERR')} | O servidor não possui um canal de sugestões!`);

            message.reply(`Este servidor não possui um canal de sugestões! digite *\`b.sugestao <canal>\`* para adicionar um!`);

        } else if (!canalDeSugestoes && args[0]) {

            console.log(`${Neable.red('ERR')} | O servidor não possui um canal de sugestões!`);
            
            Canal = message.mentions.channels.first() || args[0];

            console.log(`${Neable.orange('LOADING')} | Procurando por canal, conteúdo recebido: ${args[0]}`);
            
            Canal = message.guild.channels.find(c => c.id === args[0] || c.id === Canal.id)
            
            if (!Canal) {

                console.log(`${Neable.red('ERR')} | Não pude encontrar nenhum canal, retornando ao usuário!`);
                
                return message.reply(`Não encontrei este canal.`);
                
            }
            
            if (Canal.type !== 'text') {
                
                console.log(`${Neable.red('ERR')} | O canal encontrado não é de texto, retornando ao usuário!`);

                message.reply(`Precisa ser um canal de texto.`)
            }
            

            const novoCanalDeSugestoes = new Sugestao({

                serverID: message.guild.id,

                channelID: Canal.id

            })

            novoCanalDeSugestoes.save()

                .then(() => {

                    message.reply(`O canal de sugestões foi setado em: ${Canal} e já está pronto para uso!`)

                    console.log(`${Neable.green('NEW')} | ${Neable.blue(message.guild.name)} Setou ${Neable.blue(`${Canal.name}`)} como novo canal de sugestões!`);

                }).catch((err) => console.log(err));

        } else if (canalDeSugestoes && !args[0]) {

            console.log(`${Neable.green('SUCCESS')} | O servidor possui um canal de sugestões! ID: ${canalDeSugestoes.channelID}`);

            message.reply(`O canal está setado em: <#${canalDeSugestoes.channelID}>, para editar utilize *\`b.sugestao <canal>\`*`)

        } else if (canalDeSugestoes && args[0]) {

            console.log(`${Neable.orange('LOADING')} | Atualizando canal de sugestões...`);

            canal = message.mentions.channels.first() || args[0];

            canal = message.guild.channels.find(c => c.id === canal || c.name === canal);

            if (!canal) {
                
                console.log(`${Neable.red('ERR')} | Não pude encontrar nenhum canal, retornando ao usuário!`);

                return message.reply(`Canal não encontrado!`);

            } 

            if (canal.type !== 'text') {
                
                console.log(`${Neable.red('ERR')} | O canal encontrado não é de texto, retornando ao usuário!`);

                return message.reply(`Precisa ser um canal de texto!`);
            } 

            canalDeSugestoes.channelID = canal.id;

            canalDeSugestoes.save()

                .then(() => {

                    message.reply(`O canal de sugestões foi setado em: ${canal} e já está pronto para uso!`)

                    console.log(`${Neable.orange('EDITED')} | ${Neable.blue(message.guild.name)} Setou ${Neable.blue(`${canal.name}`)} como novo canal de sugestões!`);

                }).catch((err) => console.log(err));
        }

    })
}

module.exports.help = {
    name: "sugestao",
    type: "moderation",
    description: "Adicione um canal de sugestões com opção upvote automático!",
    usage: "b.sugestao <canal>",
    example: "b.sugestao #canal-de-sugestoes",
    working: false
}