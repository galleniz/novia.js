const {EmbedBuilder, Embed, ActionRowBuilder,ButtonBuilder,ButtonStyle} = require("discord.js")
const Command = require("../Command")
class Source extends Command {
    constructor()
    {
        super(
            {
                name: "info",
                reqOwner: false
            }
        )
    }
    run(message,client,args)
    {
        const pinchiayudatengosida = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Invitame')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=1090499537296162887&permissions=412384238656&scope=applications.commands%20bot`),
            new ButtonBuilder()
            .setLabel('Mi código')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://github.com/MrNiz/novia.js`),
         
        );
        const embed = new EmbedBuilder()
        .setTitle("Sobre mi")
        .setColor("Random")
        .setThumbnail(client.user.avatarURL())
        .setDescription("Soy un bot de **[Nodejs](https://nodejs.org/es)** con **[Discord.js](https://discord.js.org/)** usando la API de **[openai](https://openai.com/)** desarrollado por **[@MrNiz](https://discord.com/users/482637805034668032)**.\nMi proposito es estar contigo y apoyarte en lo que quieras. :3")
        message.reply({embeds: [embed], components: [pinchiayudatengosida]})
    }
}
module.exports = new Source();