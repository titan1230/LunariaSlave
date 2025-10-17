const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-reminder')
        .setDescription('Removes your daily reminder.'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const task = client.tasks.get(interaction.user.id);

        if (task) {
            task.stop();
            client.tasks.delete(interaction.user.id);
            await client.db.prepare("DELETE FROM crons WHERE userID = ?").run(interaction.user.id);
            return interaction.reply({ content: `✅ Your daily reminder has been removed.`, flags: MessageFlags.Ephemeral });
        } else {
            return interaction.reply({ content: `❌ You don't have a daily reminder set.`, flags: MessageFlags.Ephemeral });
        }
    },
};
