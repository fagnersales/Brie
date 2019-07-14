const Discord = require('discord.js');
const Neable = require('../../neable_module/NeableCommands');
module.exports.run = async (Brie, message, args) => {
    // Command here.

    if (args[0] == 'help') {

        function sendHelp(desc) {
            return Neable.createEmbed(message, {
                description: desc
            })
        }

        if (args[1] == 'title') {

            sendHelp(`Adicione o título do embed!
Uso: \`title: Insira o título aqui\`

Exemplo: \`title: Este é o seu novo título!\`

Note: Limite de carácteres **(256)**`);

        } else if (args[1] == 'description') {

            sendHelp(`Adicione a descrição do embed!
Uso: \`description: Insira a descrição aqui\`

Exemplo: \`description: Essa é sua nova descrição!\`

Note¹: Limite de carácteres **(2048)**
Note²: Aceita markdown [google](https://www.google.com/)
\`[google](https://www.google.com/)\``);

        } else if (args[1] == 'color') {

            sendHelp(`Adicione a cor do embed!
Uso: \`color: Insira a cor aqui\`

Exemplo: \`color: #2dbd20\`

Note: Só aceita cores em formato [hexadecimal](https://www.google.com/search?client=firefox-b-d&q=hexcolor+picker)
Opções: **{random}**`)


        } else if (args[1] == 'footer') {
            sendHelp(`Adicione o footer do embed!
Uso: \`footer: Insira o footer aqui\`

Exemplo: \`footer: {autor}\`

Note¹: Limite de carácteres **(1024)**
Note²: Você só pode editar o texto!

Opções: {autor}`)

        } else if (args[1] == 'image') {
            sendHelp(`Adicione a imagem do embed!
Uso: \`image: <URL> / <Envie um arquivo de imagem>\`

Exemplo: \`image: {autor}\`

Opções: {autor}`)

        } else if (args[1] == 'thumbnail') {
            sendHelp(`Adicione a thumbnail do embed!
Uso: \`thumbnail: <URL> / <Envie um arquivo de imagem>\`

Exemplo: \`thumbnail: {autor}\`

Opções: {autor}`)

        } else if (args[1] == 'timestamp') {
            sendHelp(`Adicione um timestamp ao embed!
Uso: \`timestamp: true / false\`
Note: **true** para ativar. **false** para remover`)

        } else if (args[1] == 'field') {
            sendHelp(`Adicione um field ao embed!
Uso: \`field: título
conteúdo\`

Note¹: Limite de carácteres título = **(256)**
Note²: Limite de carácteres subtítulo = **(1024)**
Note¹: Limite de fields = **(24)**

Opções: **remover**
Exemplo: \`field: remover 2 (Remove o segundo field)\``)
        }
        else {
            sendHelp(`Adicione uma das opções após **help** \`\`title\`\`, \`\`description\`\`, \`\`color\`\`, \`\`image\`\`, \`\`thumbnail\`\`, \`\`footer\`\`, \`\`timestamp\`\``)
        }



        return;
    }

    function addTitle(title) {
        try {

            criandoEmbed.setTitle(title)

            message.channel.send(criandoEmbed);

            console.log(`\n${Neable.blue('NOVO TÍTULO')} | Novo título foi adicionado: ${Neable.blue(title)}`);

        } catch (err) {

            console.log(err);

            message.reply(`Não pude adicionar este título, por favor veja se você o fez corretamente!`);
        }
    }

    function addDescription(description) {
        try {

            criandoEmbed.setDescription(description)

            message.channel.send(criandoEmbed);

            console.log(`\n${Neable.blue('NOVA DESCRIÇÃO')} | Nova descrição foi adicionada: ${Neable.blue(description)}`);

        } catch (err) {

            console.log(err);

            message.reply(`Não pude adicionar este título, por favor veja se você o fez corretamente!`);
        }
    }

    function addColor(color) {
        try {

            criandoEmbed.setColor(color)

            message.channel.send(criandoEmbed);

            console.log(`\n${Neable.blue('NOVA COR')} | Nova cor foi adicionada: ${Neable.blue(color)}`);

        } catch (error) {

            console.log(error);

            message.reply(`Não pude adicionar esta cor, por favor veja se você o fez corretamente!`);
        }
    }

    function addImage(link) {
        try {

            criandoEmbed.setImage(link);

            message.channel.send(criandoEmbed);

            console.log(`\n${Neable.blue('NOVA IMAGEM')} | Nova imagem foi adicionada: ${Neable.blue(link)}`);

        } catch (error) {

            console.log(err);

            message.reply(`Não pude adicionar esta imagem, por favor veja se você o fez corretamente!`);
        }
    }

    function addFooter(text, icon) {
        try {
            if (!icon) icon = message.author.avatarURL;
            criandoEmbed.setFooter(text, icon);
            message.channel.send(criandoEmbed);
            console.log(`\n${Neable.blue('NOVO FOOTER')} | Novo footer foi adicionado: ${Neable.blue(text)}`);
        } catch (error) {
            console.log(error);
            message.reply(`Não pude adicionar este footer, por favor veja se você o fez corretamente!`);
        }
    }

    function addThumbnail(link) {
        try {

            criandoEmbed.setThumbnail(link);

            message.channel.send(criandoEmbed);

            console.log(`\n${Neable.blue('NOVA THUMBNAIL')} | Nova thumbnail foi adicionada: ${Neable.blue(link)}`);

        } catch (error) {

            console.log(err);

            message.reply(`Não pude adicionar esta thumbnail, por favor veja se você o fez corretamente!`);
        }
    }

    function addField(name, value) {
        criandoEmbed.addField(name, value);
        message.channel.send(criandoEmbed)
    }

    function addTimestamp(boolean) {
        if (boolean == true) {
            criandoEmbed.setTimestamp();
            message.channel.send(criandoEmbed)
        } else {
            criandoEmbed.timestamp = undefined;
            message.channel.send(criandoEmbed)
        }
    }

    async function criandoEmbedFunction() {

        Neable.createEmbed(message, {
            description: `Se esta for sua primeira vez use: *\`help list\`* para ver todas as suas opções!`
        })

        const criandoEmbed = new Discord.RichEmbed();

        message.channel.send(criandoEmbed);

        const filter = m => m.author.id === message.author.id;

        const setOptions = new Discord.MessageCollector(message.channel, filter, { max: 999, time: 300000 });

        setOptions.on('collect', async (collected) => {

            Coletado = collected.content

            helplist = await Neable.startswith(Coletado, "help list"); // working
            title = await Neable.startswith(Coletado, "title: "); // working
            description = await Neable.startswith(Coletado, "description: "); // working
            image = await Neable.startswith(Coletado, "image:"); // working
            thumbnail = await Neable.startswith(Coletado, "thumbnail:"); // working
            color = await Neable.startswith(Coletado, "color: "); // working
            field = await Neable.startswith(Coletado, "field: "); // working
            footer = await Neable.startswith(Coletado, "footer: "); // working
            timestamp = await Neable.startswith(Coletado, "timestamp: "); // working 
            terminar = await Neable.startswith(Coletado, "terminar"); // working
            cancelar = await Neable.startswith(Coletado, "cancelar"); // working

            if (helplist) {
                Neable.createEmbed(message, {
                    timestamp: false,
                    title: 'Todas as coisas que você pode fazer num EMBED!\n',
                    description: `**title:** __Adicione um titulo na embed!__\n
                    **description:** __Adicione uma descrição na embed!__\n
                    **color:** __Adicione uma cor para a embed [HexColorPicker](https://www.google.com/search?client=firefox-b-d&q=hexcolor+picker)__
                    \n**footer:** __Adicione um texto no footer!__\n
                    **image:** __Adicione uma imagem!__\n
                    **thumbnail:** __Adicione uma pequena imagem na lateral!__\n
                    **timestamp:** __Adicione o horário que foi criada!__\n
                    **cancelar:** _Cancela a criação do embed!_\n
                    **terminar:** _Termina o embed e gera o código do mesmo!_`,
                    footer: [`Este comando tem uma ajuda especial! Aprenda tudo sobre usando apenas: b.help embed`, `${message.author.displayAvatarURL}`]
                })
            }

            if (title) {

                title.length == 0 ? message.reply(`Adicione algo ao título!`) : null;

                title.length > 256 ?
                    message.reply(`O título não pode exceder 256 caracteres!`)
                    : addTitle(title);

            }

            if (description) {

                description.length == 0 ? message.reply(`Adicione algo à descrição!`) : null;

                description.length > 2048 ?
                    message.reply(`A descrição não pode exceder 2048 caracteres!`)
                    : addDescription(description);

            }

            if (color) {

                options = color.toLowerCase();

                if (options == "{random}") {
                    color = 'RANDOM';
                    addColor(color);
                    return;
                }

                if (color.length > 7 || color.length < 6) {

                    return message.reply(`Certifique-se de que você está usando um código HEXADECIMAL \`Ex: #FFFFFF\``)

                }

                if (color.length == 6 && !color.includes("#")) {

                    color = "#" + color;

                }

                addColor(color);
            }

            if (image) {
                let attach = collected.attachments.first()

                if (!attach) {

                    console.log(`\nAttach Info: ${Neable.red('INEXISTENTE')} | Buscando por link...`);

                    URL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

                    let link = image;

                    if (link.includes(" ")) link = link.replace(/ /g, "")

                    url = URL.test(link);

                    if (url) {

                        console.log(`\nLink encontrado: "${Neable.blue(link)}"`);

                        addImage(link);

                    } else if (!url) {

                        link = link.toLowerCase();

                        if (link == '{autor}') {

                            console.log(`\nOpção encontrada: ${Neable.blue('{autor}')}`);

                            link = message.author.avatarURL;

                            addImage(link);
                        } else {
                            console.log(`\n${Neable.red('SEM SUCESSO')} | Nenhuma forma de thumbnail foi encontrada, avisando ao usuário.`)

                            return message.reply(`Não consegui encontrar link, arquivo ou uma de minhas opções, por favor verifique o comando e tente novamente!`);

                        }
                    }
                } else {

                    console.log(`\nAttach Info: ${Neable.green('EXISTENTE')}`);

                    link = attach.url;

                    addImage(link);
                }

            }

            if (footer) {
                let texto;

                hasdefault = footer.toLowerCase();

                if (footer.length > 2048) return message.reply(`A quantidade de caracteres não pode exceder 2048!`);

                if (hasdefault == '{autor}') {

                    console.log(`\nTipo de footer: ${Neable.red('AUTOR')}`)

                    addFooter(message.author.tag, message.author.avatarURL)

                } else {

                    console.log(`\nTipo de footer: ${Neable.red('DEFAULT')}`)

                    texto = footer;

                    addFooter(texto);
                }
            }

            if (thumbnail) {
                let attach = collected.attachments.first()
                let link;

                if (!attach) {

                    console.log(`\nAttach Info: ${Neable.red('INEXISTENTE')} | Buscando por link...`);

                    URL = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)

                    link = thumbnail

                    if (link.includes(" ")) link = link.replace(/\s/g, "");

                    url = URL.test(link)

                    if (url) {

                        console.log(`\nLink encontrado: "${Neable.blue(link)}"`);

                        addThumbnail(link);

                    } else if (!url) {

                        console.log(`\nLink ${Neable.red('não')} encontrado... buscando por opções.`);

                        link = link.toLowerCase();

                        if (link == '{autor}') {
                            console.log(`\nOpção encontrada: ${Neable.blue('{autor}')}`);

                            link = message.author.avatarURL;

                            console.log(link)

                            addThumbnail(link)

                        } else {

                            console.log(`\n${Neable.red('SEM SUCESSO')} | Nenhuma forma de thumbnail foi encontrada, avisando ao usuário.`)

                            return message.reply(`Não consegui encontrar link, arquivo ou uma de minhas opções, por favor verifique o comando e tente novamente!`);
                        }

                    }

                } else {

                    console.log(`\nAttach Info: ${Neable.green('EXISTENTE')}`);

                    link = attach.url;

                    addThumbnail(link);
                }

            }

            if (field) {
                value = field;
                valueArg = field.split(" ");

                if (valueArg[0] == 'remover') {

                    console.log(`${Neable.blue('LOG')} | Solicitação para remover field recebida!`);

                    if (criandoEmbed.fields.length == 0) {

                        console.log(`${Neable.red('ERR')} | Nenhum field para remover, retornando ao usuário!`);

                        return message.reply(`Você não adicionou nenhum field ainda!`);
                    } else {

                        if (isNaN(valueArg[1])) {

                            console.log(`${Neable.red('ERR')} | O usuário indicou um field inválido (NaN)!`);

                            return message.reply(`Você precisa indicar pelo valor númerico! (1 - ${criandoEmbed.fields.length})`);

                        }

                        if (valueArg[1] > criandoEmbed.fields.length || valueArg[1] == 0) {

                            console.log(`${Neable.red('ERR')} | Valor não encontrado, retornando ao usuário!`);

                            return message.reply(`Este field não existe! **(1 - ${criandoEmbed.fields.length})**`);

                        } else {

                            valueNumber = parseInt(valueArg[1], 10);

                            valueNumber = valueNumber;

                            console.log("Number " + valueNumber)

                            fields = Neable.ArrayRemove(criandoEmbed.fields, valueNumber);

                            criandoEmbed.fields = fields;

                            message.channel.send(criandoEmbed);
                        }
                    }
                    return;
                }

                if (value.includes('\n')) {

                    value = value.split('\n')

                    titulo = value[0];
                    subtitulo = value[1];
                    if (titulo.length > 256) {
                        console.log(`${Neable.red('ERR')} | Título excedeu o limite de caracteres, retornando ao usuário!`);
                        return message.reply(`O título excedeu o limite de caracteres (256)!`);
                    }
                    if (subtitulo.length > 1024) {
                        console.log(`${Neable.red('ERR')} | Subtítulo excedeu o limite de caracteres, retornando ao usuário!`);
                        return message.reply(`O subtítulo excedeu o limite de caracteres (1024)!`);
                    }
                    addField(titulo, subtitulo);

                } else {
                    message.reply(`Você executou este comando incorretamente, veja como usar em *\`b.help embed field\`*`)
                }
            }

            if (timestamp) {
                if (timestamp == 'true') {
                    console.log(`${Neable.green('SUCCESS')} | Adicionando timestamp`)
                    addTimestamp(true);
                } else if (timestamp == 'false') {
                    console.log(`${Neable.green('SUCCESS')} | Removendo timestamp`)
                    addTimestamp(false);
                }
            }

            if (terminar) {

                embedID = Neable.createID(20);

                criandoEmbed.EmbedID = embedID;

                message.author.send(`Seu embed foi finalizado! Aqui está o código dele: *\`${embedID}\`*\nNão sabe como usá-lo? digite *\`b.help embed codigo\`*`);
                const fs = require('fs');

                data = require("../../embeds.json");

                data = JSON.stringify(data)

                data = JSON.parse(data)

                data.savedEmbeds.push(criandoEmbed);

                data = JSON.stringify(data, null, 2);

                fs.writeFileSync('./embeds.json', data);

                setOptions.stop();
            }

            if (cancelar) {
                console.log(`Cancelando...`)
                message.reply(`Cancelado com sucesso!`);
                setOptions.stop();
            }
        });

    }

    criandoEmbedFunction()

}

module.exports.help = {
    name: "embed",
    type: "moderation",
    description: "Crie um lindo embed com simples mensagens!",
    usage: "b.embed",
    example: "b.embed",
    working: true
}