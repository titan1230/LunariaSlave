const { MessageFlags, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    sub: 'RiffyButtons',
    once: false,
    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction 
     */
    async execute(client, interaction) {
        if (!interaction.isButton()) return;

        const player = client.riffy.players.get(interaction.guild.id);

        if (interaction.customId === 'pause') {
            await interaction.deferUpdate();

            if (!player) {
                return interaction.reply({
                    content: "There is no active player for this server.",
                    flags: MessageFlags.Ephemeral,
                });
            }

            player.pause(true);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('disconnect')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏺'),

                    new ButtonBuilder()
                        .setCustomId('play')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('▶'),

                    new ButtonBuilder()
                        .setCustomId('skip')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏭')
                );

            return await interaction.message.edit({
                components: [row]
            })
        } else if (interaction.customId === 'play') {
            await interaction.deferUpdate();

            if (!player) {
                return interaction.reply({
                    content: "There is no active player for this server.",
                    flags: MessageFlags.Ephemeral,
                });
            }

            player.pause(false);

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('disconnect')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏺'),

                    new ButtonBuilder()
                        .setCustomId('pause')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏸'),

                    new ButtonBuilder()
                        .setCustomId('skip')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏭')
                )

            return await interaction.message.edit({
                components: [row]
            })

        } else if (interaction.customId === 'skip') {
            await interaction.deferUpdate();

            if (!player) {
                return interaction.reply({
                    content: "There is no active player for this server.",
                    flags: MessageFlags.Ephemeral,
                });
            }

            player.stop();

            const rowDisabled = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('disconnect')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏺')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('pause')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏸')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('skip')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏭')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('skiped')
                        .setStyle(ButtonStyle.Success)
                        .setLabel('Skiped')
                        .setDisabled(true)
                );

            return await interaction.message.edit({
                components: [rowDisabled]
            })
        } else if (interaction.customId === 'disconnect') {
            await interaction.deferUpdate();

            if (!player) {
                return interaction.reply({
                    content: "There is no active player for this server.",
                    flags: MessageFlags.Ephemeral,
                });
            }

            player.destroy();

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('disconnect')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏺')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('play')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('▶')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('skip')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('⏭')
                        .setDisabled(true),

                    new ButtonBuilder()
                        .setCustomId('skiped')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('Disconnected')
                        .setDisabled(true)
                )

            return await interaction.message.edit({
                components: [row]
            });
        }
    }
}