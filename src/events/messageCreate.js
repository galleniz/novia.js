require("dotenv").config()
module.exports = async (client,message)=>{ 
    if (message.author.bot)
        return;
     if (!message.content.startsWith(`<@${client.user.id}>`) && !message.mentions.members.has(client.user.id) && !message.content.toLowerCase().startsWith(process.env.PREFIX))
        return
       const [cmd, ...args] = message.content.slice(process.env.PREFIX.length).split(/ +/).map(str => str);
    const command = client.commands.get(cmd)
   
    if (command)
       return command.tryRun(message,client,args)
    if (message.content.toLowerCase().startsWith(process.env.PREFIX))
         return

    if (message.content.startsWith(`<@${client.user.id}>`))
        message.content = message.content.replace(`<@${client.user.id}>`,"").trim()
 
    const response = await client.openai.chat(message)
    message.reply(response)

   
    
 
   
  
}