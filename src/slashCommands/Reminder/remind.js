const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const cron = require('node-cron');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-reminder')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The reminder message you want to receive daily.')
                .setRequired(true)
        )
        .setDescription('Reminds daily at the time u run this command!'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const message = interaction.options.getString('message', true);
        const time = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false, });
        const [hours, minutes] = time.split(' ')[1].split(':');

        // console.log(hours, minutes);
        await client.db.prepare("INSERT INTO crons (userID, hours, minutes, message) VALUES (?, ?, ?, ?) ON CONFLICT(userID) DO UPDATE SET hours = ?, minutes = ?, message = ?").run(interaction.user.id, parseInt(hours), parseInt(minutes), message, parseInt(hours), parseInt(minutes), message);

        const task = cron.schedule(`${minutes} ${hours} * * *`, async () => {
            interaction.user.send(`⏰ Daily Reminder: ${message}`).catch(console.error);
        }, {
            timezone: "UTC"
        });

        client.tasks.set(interaction.user.id, task);

        return interaction.reply({ content: `✅ You will be reminded daily with the message: "${message}"`, flags: MessageFlags.Ephemeral });
    },
};
