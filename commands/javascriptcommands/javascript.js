const superagent = require('superagent');
const Neable = require("../../neable_module/NeableCommands")
module.exports.run = (Brie, message, args) => {


    // function sendEmbed(explication, usage) {
    //     Neable.createEmbed(message, {
    //         description: `Explicação:\`\`\`js\n${explication}\`\`\`\nExemplo: \`\`\`js\n${usage}\`\`\``
    //     })
    // }

    // if (args[0] == 'Array') {
    //     sendEmbed("The Array object is used to store multiple values in a single variable:", `var cars = ["Saab", "Volvo", "BMW"]; `)
    // }

}

module.exports.help = {
    name: 'javascript',
    working: false
}