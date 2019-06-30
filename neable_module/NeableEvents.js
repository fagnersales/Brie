const events = require('events');
eventEmitter = new events.EventEmitter();


function Connected() {
    console.log('You got the Connected event!');
}

eventEmitter.on('connected', Connected)

module.exports.connected = () => {

eventEmitter.emit('connected')

}