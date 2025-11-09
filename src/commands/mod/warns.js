const { Colors } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "warns",
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    async execute(client, message, args) {
        let user = message.mentions.members?.first() || await message.guild?.members.fetch(args[0]).catch(() => null);

        if (!user) user = message.member;

        const data = client.db.prepare("SELECT * FROM warns WHERE user_id = ?").all(user.id);

        if (data.length === 0) {
            return message.reply(`User <@${user.id}> has no warns.`);
        }

        const embed = new EmbedBuilder()
            .setTitle(`Warnings for ${user.user.tag}`)
            .setColor(Colors.Yellow)
            .setTimestamp();

        for (let i = 0; i < Math.min(data.length, 25); i++) {
            const warn = data[i];

            embed.addFields(
                {
                    name: `Warn ID: ${warn.warn_id}`,
                    value: `**Reason:** ${warn.reason}\n**Timestamp:** <t:${warn.timestamp}:F>`
                }
            );
        }

        await message.reply({ embeds: [embed] });
    }
};