const {BaseInteraction, SlashCommandBuilder,EmbedBuilder, CommandInteraction, Client} = require("discord.js")
module.exports = {
  name: "report",
 data: new SlashCommandBuilder()
 .setName("report")
 .setDescription('Cuando tienes un error o quieres sugerir algo, puedes hacerlo aquí')
 .addStringOption((option) =>
						option
							.setName('type')
							.setDescription('¿Cuál es un error?')
							.addChoices(
                { 
                  name: 'api-error', 
                  value: "api-error" 
                }, 
                { 
                  name:  'el-bot-no-responde', 
                  value: 'el-bot-no-responde' 
                },
                {
                  name: "sugerir",
                  value:"sugerir"
                  
                }
                )
						
							.setRequired(true),
 )
 .addStringOption((option)=>
              option
							.setName('message')
							.setDescription('¿Cuál sería tu opinión/consideración/problema?')
							.setRequired(true),
 )

 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */
  run: async (client, interaction) => {
    const msg = interaction.options.getString('message');
    const type = interaction.options.getString('type');
    const guild = client.guilds.cache.get("1088474453761085550")
    const channel = guild.channels.cache.get("1090309447064236052")

    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.user.username + "'s report",iconURL: interaction.user.avatarURL()})
    .setTitle(type.replaceAll("-", " ").toUpperCase())
    .setColor("Random")
    .setDescription("in " + interaction.guild.name + " (`" + interaction.guild.id + "`) from `" + interaction.user.username + "#" + interaction.user.discriminator + "` (`" + interaction.user.id + "` <@" +interaction.user.id + "> )")
    .setFields({
      name: "Type",
      "value": `\`${type}\``
    },
    {
      name: "Message",
      value: `\`${msg}\``,
    },
    {
      name: "On date",
      "value":"<t:"+ (Math.floor(Date.now() / 1000 ))+ ">" + " <t:"+ (Math.floor(Date.now() / 1000 ))+ ":R>"
    }
    )
    await channel.send({embeds: [ embed]})
    interaction.reply({content:"Report sended!.", ephemeral:true});

  },
};