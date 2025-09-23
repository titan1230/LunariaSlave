const { MessageFlags, TextDisplayBuilder, ContainerBuilder } = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        try {
            if (!interaction.isChatInputCommand()) return;

            // Block commands in DMs
            if (!interaction.guild) {
                const accentColor = parseInt(config.color.replace('#', ''), 16);
                const dmBlock = new ContainerBuilder()
                    .setAccentColor(accentColor)
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`${config.crossmark_emoji} This command can only be used in a server.`)
                    );

                return interaction.reply({
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                    components: [dmBlock],
                });
            }

            // Run command
            const command = client.slash.get(interaction.commandName);
            if (!command) return;

            const cooldown = client.cooldown.get(`${interaction.commandName}-${interaction.user.id}`);

            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    interaction.reply({
                        content: `${config.cross_emoji} You are on a cooldown. Please wait <t:${Math.floor(cooldown / 1000)}:R> before using this command again.`,
                        flags: MessageFlags.Ephemeral,
                    });
                    return;
                }
            }

            client.cooldown.set(`${interaction.commandName}-${interaction.user.id}`, Date.now() + command.cooldown * 1000);

            await command.run(client, interaction, interaction.options);

            setTimeout(() => {
                client.cooldown.delete(`${interaction.commandName}-${interaction.user.id}`);
            }, command.cooldown * 1000);
        } catch (err) {
            console.error('[INTERACTION ERROR]', err);

            if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
                const errorBlock = new ContainerBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent('An unexpected error occurred while handling this interaction.')
                    );
                interaction.reply({
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                    components: [errorBlock],
                }).catch(console.error);
            }
        }
    },
};
