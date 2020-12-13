
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });



client.login(process.env.TOKEN);

client.on('ready', () => {
    
	remControl();
    
});


client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;


 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
 
   

    if (cmd === `!channel`) {
		console.log(message.channel.id);
        return message.channel.send(message.channel.id);
    }
});

const { Database, Event, Reminder, Advertisement, Subscription} = require('./database.js');
const database = new Database();


// function timer
const timer = ms => new Promise(res => setTimeout(res, ms));


// reminder control function
async function remControl()
{
	let remArray = [];
	let subArray = [];
	let deltaTime;
	let message;

	let tempEvent;
	let guild;
	let channel;

	const checkTime = 1000 * 60;	// 1 minute 

	while (true)
	{
		remArray = await database.listReminder();	// get all reminders in the database

		if (remArray !== null)
		{
			for (let element of remArray)
			{
				deltaTime = element.time - new Date();

				if (deltaTime > 0 && deltaTime < checkTime)
				{
					tempEvent = await database.getEvent(element.eventId);	// get the corresponding event of the reminder		
					guild = await client.guilds.fetch(tempEvent.serverId);
					channel = await guild.systemChannel;
								
					subArray = await database.listSub(tempEvent.id);	// get all Subscriptions that relate to the event
					
					if (subArray !== null)
					{
						message = "";
						for (let sub of subArray)
						{
							message += `<@${sub.userId}> `;	
						}
	
						message += '\n';
						message += tempEvent.toString();
						message += '\n';

						channel.send(message);
					}
				}
			}
		
		}

		await timer(checkTime);
	}

}

