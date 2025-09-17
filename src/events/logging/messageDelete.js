const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageDelete,
    sub: 'Logging-MessageDelete',
    once: false,
    /**
     * @param {import("discord.js").Client} client
     * @param {import("discord.js").Message} message
    */
    async execute(client, message) {
        if (message.author?.bot) return;
        if (!message.guild) return;

        if (message.partial) await message.fetch().catch(() => { });

        const loggingChannel = client.loggingChannel
        if (!loggingChannel) return;

        let deleter = "Unknown (possibly self-deleted)";

        try {
            // Fetch audit logs
            const fetchedLogs = await message.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.MessageDelete,
            });

            const deletionLog = fetchedLogs.entries.first();
            if (deletionLog) {
                const { executor, target, createdTimestamp } = deletionLog;

                const timeDiff = Date.now() - createdTimestamp;
                if (target.id === message.author?.id && timeDiff < 5000) {
                    deleter = executor.tag;
                }
            }
        } catch (err) {
            console.error("Error fetching audit logs:", err);
        }

        const embed = new EmbedBuilder()
            .setTitle("🗑️ Message Deleted")
            .setColor("Red")
            .addFields(
                { name: "Author", value: message.author ? `${message.author.tag}` : "Unknown", inline: true },
                { name: "Deleted By", value: deleter, inline: true },
                { name: "Channel", value: `${message.channel}`, inline: true },
            )
            .setDescription(
                message.content
                    ? `**Message Content:**\n${message.content}`
                    : "*No text content (might have been an embed, attachment, or empty)*"
            )
            .setTimestamp();

        if (message.attachments.size > 0) {
            embed.addFields({ name: "Attachments", value: message.attachments.map(a => a.url).join("\n") });
        }

        loggingChannel.send({ embeds: [embed] });
    }
}