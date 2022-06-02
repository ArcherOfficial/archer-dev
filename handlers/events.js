const fs = require('fs');

function events(client) {
    fs.readdirSync('./events').forEach(file=> {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        if (typeof event !== 'function') throw new Error(`cannot load events ${file}, because events file is not function!`);

        client.on(eventName, (...args) => event(client, ...args));
    });
    console.log('Events: Reloaded...');
};

module.exports = {
    load: events
};
