const Neable = require('../neable_module/NeableCommands.js')
module.exports.run = async (Brie, message, args) => {
    // Command here.
    if(!Array.prototype.chunk) Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

async function limpar(message, quantidade) {
    let deletadas = 0;
    let antigas = false;

    let times = ~~(quantidade / 100);
    let indexes = ([...Array(quantidade)].map(() => 1)).chunk(times).map(value => [value.size]);

    async function excluir(index = 0) {
            let quantidade = indexes[index++][0];
    }

    return await excluir();
}
}
    
module.exports.help = {
    name: "salvar",
    description: undefined,
    usage: undefined,
    example: undefined,
    working: false
}