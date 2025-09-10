const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  MessageFlags,
  PermissionFlagsBits,
  ChannelType,
} = require('discord.js');
const config = require('../../config/config.json');
const { ageContainer, devicesContainer, genderContainer, pingsContainer } = require('../../constants/ReactionRoles');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rr')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => option.setName('channel').setDescription('The channel to send the message in').setRequired(false).addChannelTypes(ChannelType.GuildText))
    .setDescription('Sends the reaction roles message.'),
  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    await interaction.reply({ content: 'Sending message...', ephemeral: true });

    // Reply
    await channel.send({
      flags: MessageFlags.IsComponentsV2,
      components: [genderContainer, ageContainer],
    });

    await channel.send({
      flags: MessageFlags.IsComponentsV2,
      components: [devicesContainer, pingsContainer],
    });
    await interaction.editReply({ content: 'Sent the reaction roles message.', ephemeral: true });
  }
};