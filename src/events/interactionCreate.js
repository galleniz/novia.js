const { PermissionFlagsBits, EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, BaseInteraction  } = require('discord.js');
module.exports = async (client,interaction)=> {
    if (interaction.isButton())
    {
        if (interaction.guild.id === "1090826824273117274")
            {
                if (!client.bannedUser.hasUser(interaction.user))
                return interaction.reply({content:"Tu no estás baneado!.", ephemeral:true});
                const guild = interaction.guild
                if (!guild.members.cache.has(interaction.user.id))
                    return  interaction.reply({content: `You must to join to ${guild.name}`, ephemeral:true});
               const csh = await guild.channels.create({name: interaction.user.username + "-appeal",  permissionOverwrites: [
                  {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel]
                  },
                  {
                    id: client.user.id,
                    allow: [PermissionFlagsBits.ViewChannel]
                  },
                  {
                    id: guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel]
                  }
                ]
                })
                const embed = new EmbedBuilder()
                .setTitle(`<@${interaction.user.id}'s appeal`)
                .setColor("Random")
                .setImage(interaction.user.avatarURL())
                csh.send({content: `<@${interaction.user.id}> <@${process.env.DEVID}>`, embeds:[embed]})
                
                
                interaction.reply({content:"Report sended!.", ephemeral:true});
            }
    }
    if (interaction.isCommand()) {
        const command = client.slash.get(interaction.commandName);
        try {
          command.run(client, interaction);
        } catch (e) {
            console.log(e)
        }
    }
}