const Neable = require('c:/Brie/neable_module/NeableCommands');

const Discord = require('discord.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.

    const attach = message.attachments.first() // Se tiver imagem anexada/attachment ele reconhece aqui
    const fileTypes = ['.png', '.jpg'] // Pra verificar se url tem .jpg ou .png como substring em qualquer lugar dela
    let link
    let name // variavel para o nome do emoji
    let req
    let invalidFile = `\`${message.author.username}\` voce nao me mandou uma imagem válida` // msg para imagem invalida (pra nao ter que repetir a msg msg duas vezes)
    if (!message.guild.member(Brie.user.id).hasPermission(['MANAGE_EMOJIS'])) return message.channel.send('Nao tenho permissao de gerenciar emojis aqui <a:Aquacry:576449703772684289> ')
    // Substituia esses emojis da mensagens ↑ ↓ pra nao dar erro
    if (!message.member.hasPermission(['MANAGE_EMOJIS'])) return message.channel.send(`\`${message.author.username}\` voce nao tem permissao <:desaprovo:578791577552551937>`)
    console.log(attach)
    if (!attach) { // Se nao teve imagem anexada/attachment, attach == undefined ou null == !attach
        console.log('Sem attach') // Se nao teve anexo, ele entra nesse bloco pra tentar achar URL
        if (!args[0]) return message.channel.send(`\`${message.author.username}\`se usa assim \`emojiadd link nome\``) // Se nao passar args
        link = args[0] // Se nao tem anexo, ele assume args[0] como link
        if (!link.includes(fileTypes[0])) { //png   // Se args[0] (url) nao tem a substring png entra no bloco e testa jpg
            if (!link.includes(fileTypes[1])) //jpg
                return message.channel.send(invalidFile) // return pra terminar o codigo aqui
        }
        if (link.includes('.gif')) return message.channel.send('Eu ainda nao crio emojis animados (gif)') // ainda nao testei essa parte,
        req = link     // vamos colocar nossa url nessa var pra facilitar a vida **********************  // em futuro patch pode suportar gifs ou nao 
        if (args[1]) name = args[1] // Se nao foi enviada anexo e sim uma URL, o name do emoji é o segundo argumento
        else if (!args[1]) name = 'any' // Se a pessoa nao passou um segundo argumento (args[1]) para o comando, ele funciona assim mesmo e o emoji tem nome any
    }                                   // Talvez em algum patch o nome seja um numero random se nao for passado 
    if (attach) { // Se foi passado um anexo (imagem anexada) entra nesse block
        console.log('Attach encontrado') // Isso é pra debug
        if (!attach.url.includes(fileTypes[0])) { //png   //Aqui vemos se a URL (criada pelo Discord) do nosso anexo tem png ou jpg em algum lugar 
            if (!attach.url.includes(fileTypes[1])) { //jpg    
                return message.channel.send(invalidFile)  // Se nao tem, termina aqui
            }
        }
        req = attach.url // Valor da nossa req é sempre uma URL, nesse caso é a URL do anexo do Discord
        if (req.includes('.gif')) return message.channel.send(` \`${message.author.username}\` eu ainda nao crio emojis animados (gif)`)
        if (args[0]) name = args[0] // Se a imagem passada foi um anexo, entao nao tem segundo argumento, entao seria só args[0] ou nenhum
        else if (!args[0]) name = 'any' // De novo, caso nao seja passado um nome pro emoji

    }
    const superagent = require('superagent') // Importa da nossa lib superagent
    let loop = 1 // Variavel pra debug pra saber quantos loops o codigo fez até diminuir a imagem
    let buf // Variavel criada pra gente saber o tamanho do nosso arquivo em bytes
    let kb // 1 kb = 1024 bytes

    //guild.createEmoji('link', 'nome')

    superagent
        //.get('https://data.whicdn.com/images/225371257/large.jpg') São so testes, esses dois links
        //.get('https://wallpapercave.com/wp/CToGD7f.jpg')
        .get(req) // request na nossa URL, nao importando se é URL do user ou link do Discord
        .then(r => {
            console.log(typeof r) // Usamos then numa Promise pra fazer alguma coisa caso o codigo dê certo e logamos o typo da requests, geralmente é objeto (eu acho)
            console.log('O tipo da request é ' + typeof r.body) // Logamos novamente o tipo/type do objeto requisitado, eu nao lembro mas acho que retorna hexadecimal
            //console.log(r.body) // Debug apenas
            buf = Buffer.byteLength(r.body, 'utf8') // Aqui nos usamos o objeto Buffer (memória) pra verificar a quantidade de bytes do nosso arquivo e colocamos na variavel buf
            console.log('A imagem tem ' + buf + ' bytes') // Tamanho do nosso arquivo em bytes
            //message.channel.startTyping()

            const Jimp = require('jimp') // Importamos o Jimp aqui pra nao carregar sem necessidade caso o codigo nao chegue até aqui
            Jimp.read(r.body) // Lemos o nosso objeto
                .then(image => { // Os dados encontrado do nosso objeto r.body (nossa request na URL) são passados pro parametro 'image'
                    kb = buf / 1024 // Convertemos o tamanho do nosso arquivo pra kb
                    if (kb > 250) { // O tamanho maximo de imagem pra emoji no Discord é 256 kb mas achei melhor deixar uma margem razoavel
                        console.log('Tamanho da imagem maior que 250 kb') // Entrou nesse bloco pq a image passou de 250 kb
                        let kbSize = kb // Apenas pra ter o valor inicial do arquivo
                        let scaleValue = 0.5 // Nossa taxa de resize da image
                        let initialScale = scaleValue // Detalhe estético e debug
                        while (kbSize > 250) { // Enquanto o tamanho da image for maior que 250 kb
                            console.log(kbSize) // Mostra o valor da image a cada loop que é diminuída
                            console.log(`Loop ${loop}`) // Mostra o loop atual e quantos loops aconteceram pra diminuir a image
                            loop++ // Aumenta o valor do loop
                            let img = image.scale(scaleValue) // Imagem escalada pela taxa definida em scaleValue, 0.5 = metade do tamanho, 0.25 metade da metade
                            console.log(img) // Nem sabia pra que servia isso no começo, mas descobri que mostra a resoluçao da imagem Resoluçao da imagem em pixels exemplo: 400 x 400
                            kbSize = kbSize / 2 // Arquivo o tamanho da nossa imagem foi
                            scaleValue = scaleValue / 2
                            console.log(scaleValue + ' dividido')
                            console.log(initialScale)

                        }
                        console.log(`A imagem foi escalada em ${(scaleValue / initialScale) * 100}%`) // Detalhe estético que diz em quantos % foi escalada a image
                        image.write('image_resized.png') // Se image foi reduzida, é criado um arquivo com nome image_resized
                        /******************************/
                        if (kb > 250) { // Nem sei se isso é mesmo necessário... mas funcionou, ache melhor nao mexer
                            message.guild.createEmoji('image_resized.png', name) // Criando nosso emoji com a image resized e o name definido antes
                                .then(emoji => message.channel.send(`Seu emoji <:${emoji.name}:${emoji.id}>`)) // Se emoji criado com sucesso, seus dados são passados pro then
                                .catch(e => message.channel.send(`Erro ${e.message}`)) // com o then consigo enviar o emoji e catch se der erro, ce ja sabe ne
                            //message.channel.stopTyping()
                            return console.log('Codigo finalizado') // Pra saber se deu tudo certo
                            /**************************************/
                        }

                    }
                    else if (kb < 250) { // Se a imagem é menor que 250 kb, nao precisa redimensionar
                        console.log('Imagem menor que 250 kb')
                        image.write('image.png') // Cria uma imagem com nome image
                        /**********************/
                        if (kb < 250) {
                            message.guild.createEmoji('image.png', name) // Cria o emoji com a imagem e o name
                                .then(emoji => message.channel.send(`Seu emoji <:${emoji.name}:${emoji.id}>`))
                                .catch(e => message.channel.send(`Erro ${e.message}`))
                            return console.log('Codigo finalizado')
                        }

                    }
                })
        })
        .catch(err => console.log(err)) // Esse aqui é o catch caso o requests de erro
}

module.exports.help = {
    name: "addemoji",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}