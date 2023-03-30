require("dotenv").config()
const fs = require('fs');

module.exports = (client) => {
  load()
  this.reload = load;
function load()
{
  client.slash = new Map();
  const { REST, Routes } = require('discord.js');
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.ID;
  
  const commands = [];
  console.log("---------------------slash commands---------------------")
  const commandFiles = fs.readdirSync('./src/slashCommands').filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const command = require(`../src/slashCommands/${file.replace(".js","")}`);
    console.log(file)
    commands.push(command.data.toJSON());
    client.slash.set(file.replace(".js",""),command)
  }
  const rest = new REST({ version: '10' }).setToken(token);
  
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
    } catch (error) { console.error(error); }
  })();
  console.log("---------------------slash commands loaded---------------------")
  

}
};