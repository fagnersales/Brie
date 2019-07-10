const Discord = require('discord.js');
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {

    EncontrarUsuario = args.join(" ");
    if (!EncontrarUsuario) return message.reply('cade o usuario rapaz')
    try {
        const usuarioEncontrado = await Brie.fetchUser(EncontrarUsuario)
        avatar = usuarioEncontrado.avatarURL.endsWith(".gif") ? avatar = usuarioEncontrado.avatarURL + "?size=2048" : avatar = usuarioEncontrado.avatarURL
        Neable.createEmbed(message, {
            title: `Usuário encontrado: ${usuarioEncontrado.tag}`,
            field: [[`Nome:`, usuarioEncontrado.username], [`ID:`, usuarioEncontrado.id], [`TAG:`, "#" + usuarioEncontrado.discriminator]],
            image: avatar,
            footer: [`Comando por: ${message.author.tag}`, message.author.displayAvatarURL]
        })
    } catch (error) {
        try {
            Tags = "";
            UsuarioPorTAG = [];
            if (EncontrarUsuario.length < 5) {
                
                Brie.users.map((Usuario) => {
                    if (Usuario.discriminator.includes(EncontrarUsuario)) {
                        UsuarioPorTAG.push(`# ${Usuario.tag}`)
                    }
                });
                console.log(UsuarioPorTAG.length)
                if (UsuarioPorTAG.length == 0) {
                    return message.reply(`ERROR 404: Não pude encontrar nenhum usuário com esta TAG!`)
                } else {
                    
                    indexmore = 0;
                    index = 0;

                    for (let tag of UsuarioPorTAG) {
                        index++;
                        if (index > 10) {
                            indexmore++;
                        } else {
                            Tags += (tag + "\n");
                        }
                    }

                    if(indexmore > 1) {
                        Tags += (`Mais ${indexmore} usuários encontrados...`)
                    }

                    Neable.createEmbed(message, { description: `\`\`\`md\n${Tags}\`\`\`` })

                }
            } else {
                Brie.users.map((Usuario) => {
                    if (Usuario.username == EncontrarUsuario || Usuario.tag == EncontrarUsuario) {
                        Neable.createEmbed(message, {
                            title: `Usuário encontrado: ${Usuario.tag}`,
                            field: [[`Nome:`, Usuario.username], [`ID:`, Usuario.id], [`TAG:`, "#" + Usuario.discriminator]],
                            image: Usuario.displayAvatarURL,
                            footer: [`Comando por: ${message.author.tag}`, message.author.displayAvatarURL]
                        })
                    }
                })
            }
        } catch (error) {
            if (error) console.log(error)
            message.reply(`ERROR 404: Não pude encontrar nenhum usuário com essas informações.... *\`b.help finduser\`*`)
        }
    }
}

module.exports.help = {
    name: "finduser",
    type: "social",
    description: "Encontre um usuário do DISCORD pelo ID ou nos meus bancos de dados por NOME ou TAG!",
    usage: "b.finduser [ID/NOME/TAG]",
    example: "b.finduser 6565",
    working: true
} 