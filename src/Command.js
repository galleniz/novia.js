require("dotenv").config()

class Command
{
    constructor(options)
    {
        this.reqOwner = options.reqOwner || false;
        this.name = options.name;
        this.options = options;        
        
    }
    async tryRun(message,client,args)
    {
        if (this.reqOwner && (message.author.id !== process.env.DEVID))
            return;
        this.run(message,client,args)
    }
    async run(message,client)
    {
        return message.reply("This command doesn't exists!")
    }
}
module.exports = Command;