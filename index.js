const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const { Server } = require('ws');

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());
    });
  }, 1000);
  
var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
var el;

ws.onmessage = function (event) {
el = document.getElementById('server-time');
el.innerHTML = 'Server time: ' + event.data;
};
  

// -------------------------------------------------------------------------- //
const {Client} = require('discord.js')
const WS = require('./ws/ws')

var client = new Client()

var ws = new ws('123456', 5665, client)

client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`)
})

client.login(process.env.TOKEN);



/* FROM OLD BOT

const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();


client.on('ready', () => {
    console.log('I am ready!');
    client.user.setActivity("test"); // "Playing <>" status message for bot
});

client.on("message", async message => {
    // not really sure what these do, don't think they affect enything
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    // prefix is '!' for executing commands (prefix is set in config.json)
    let prefix = config.prefix; 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let d = new Date();
    let helpArray = ["!ping"," !date"]; // any command we add should be added to this array

    if (cmd === `${prefix}ping`) {
        return message.channel.send("pong");
    }

    /*
    this will just simply print the current date/time with pretty raw formatting. 
    just wanted to see how bots handle outputting variables. 
    be sure to use back ticks (`) when doing this

    if (cmd === `${prefix}date`) {
        return message.channel.send(`${d}`);
    }

    if (cmd === `${prefix}help`) {
        return message.channel.send("Available commands: " + `${helpArray}`);
    }
});
*/
// do not touch this. this is how our bot links to our code from discord. 
// the TOKEN variable is set in Heroku so the key is not on GitHub