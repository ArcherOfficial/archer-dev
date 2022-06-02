const Discord = require('discord.js');
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles', 'everyone'],
        repliedUser: false
    },
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages
    ]
});

// client configuration
client.coc = new (require('clashofclans.js')).Client();
client.commands = new Discord.Collection();
client.config = require('./config.js');
client.slashCommands = new Discord.Collection();

client.on('error', (error) => console.error(error));
client.on('warn', (info) => console.log(info));

client.coc.login({
    email: process.env.CLASHDEV_EMAIL, 
    password: process.env.CLASHDEV_PASSWORD 
}).then(() => {
    console.log('[COC Client]:', 'Login to API ✅');
}).catch(error => {
    console.error('[COC Client]: Login failed!', error)
});

// loaded all handlers
const fs = require('fs');
fs.readdirSync('./handlers').forEach(file => require(`./handlers/${file}`).load(client));

// catching node error to handle & anticipation system crash
process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledRejection', (error) => console.error(error));

client.login(client.config.token); // Login to Discord with your Bot TOKEN

module.exports = client;
