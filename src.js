/**
 * if have an issue
 */
process.on("uncaughtException", console.error)
process.on("unhandledRejection",console.error)

require("dotenv").config()
const {Client, GatewayIntentBits, Embed, EmbedBuilder, GuildMember} = require("discord.js");
const fs = require("fs")
const OpenAI = require("./src/OpenAI")

const client = new Client(
	{
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.GuildPresences,
        ],
	}
)
const openai = new OpenAI()
client.openai = openai;
client.commands = new Map();

console.log("---------------------events---------------------")
fs.readdirSync("./src/events/").forEach((dir) => {
	dir = dir.replace(".js","")
	  try {
		let evn = require(`./src/events/${dir}`);
		evn.client = client;
		console.log("event", dir)
		client.on(dir, (a,b,c,d) => evn(client,a,b,c,d));
	  } catch (error) {
		console.error(error)
	  }
	}
);
console.log("---------------------events loaded---------------------")

console.log("---------------------commands---------------------")
fs.readdirSync("./src/commands/").forEach((dir) => {
	dir = dir.replace(".js","")
	  try {
		let command = require(`./src/commands/${dir}`);
		command.client = client;
		client.commands.set(command.name,command);
		console.log("command", dir)
	  } catch (error) {
		console.error(error)
	  }
	}
);
console.log("---------------------commands loaded---------------------")

require("./src/slashHandler")(client)
client.login(process.env.DISCORD_TOKEN)
