const Neable = require('../../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply(`Você não tem permissão para apagar mensagens!`).then(msg => msg.delete(6000))

    if (!message.guild.member(Brie.user.id).hasPermission(['MANAGE_MESSAGES'])) return message.reply(`Preciso da permissão \`MANAGE_MESSAGES\` para fazer isto!`);

    const mention = message.mentions.members.first();

    if (mention) {

        message.channel.fetchMessages()
            .then(messages => {
                console.log(`${messages.filter(m => m.author.id === mention.id).forEach((result) => console.log(result.content))}`)
            })
            .catch(console.error);

    } else {
        const quantidadeDeletar = parseInt(args[0], 10);

        if (!quantidadeDeletar || quantidadeDeletar < 2 || quantidadeDeletar > 100)

            return message.reply("Por favor, forneça um número entre 2 e 100 para o número de mensagens a serem excluídas");

        const fetched = await message.channel.fetchMessages({ limit: quantidadeDeletar });

        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Não foi possível deletar mensagens devido a: $ { error }`));
    }
}

module.exports.help = {
    name: "clear",
    type: "moderation",
    description: "Apague mensagens do canal!",
    usage: "b.clear [quantidade] [membro]",
    example: "b.clear 50",
    working: true
}