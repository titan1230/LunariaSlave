const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    sub: "AntiInviteEvent",
    name: 'messageCreate',
    once: false,

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message } message
     */
    async execute(client, message) {
        if (message.author.bot || !message.guild) return;
        if (message.member?.permissions.has(PermissionFlagsBits.Administrator) ||
            (message.channel.id === '1412114562324627666' && message.member.permissions.has(PermissionFlagsBits.ManageMessages))
        ) return;

        const regex = /(?:https?:\/\/)?discord(?:app)?\.gg\/([a-zA-Z0-9-]+)/gi;
        const matches = [...message.content.matchAll(regex)];

        if (!matches.length) return;

        for (const [, code] of matches) {
            // Skip vanity invite
            if (code === message.guild.vanityURLCode) continue;

            let isSameGuild = false;

            try {
                const invite = await client.fetchInvite(code);
                if (invite.guild?.id === message.guild.id) {
                    isSameGuild = true;
                }
            } catch {
                // Invalid or deleted invite → treat as external
            }

            if (isSameGuild) continue;

            // Delete offending message
            await message.delete().catch(console.error);

            // Warn in the channel
            const warnEmbed = new EmbedBuilder()
                .setTitle("🚫 Anti-Invite")
                .setDescription("You are not allowed to send invites here.")
                .setColor("Red")
                .setTimestamp()
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });

            await message.channel.send({ embeds: [warnEmbed] }).catch(() => { });

            // Log (cache the channel at startup if possible)
            const loggingChannel = await client.loggingChannel;

            if (loggingChannel) {
                const logEmbed = new EmbedBuilder()
                    .setTitle("Anti-Invite ❌")
                    .setDescription(`${message.author} posted an invite in ${message.channel}\n\n**User ID:** ${message.author.id}\n**Invite:** [Link](https://discord.gg/${code})\n\n**Message:** ${message.content}`)
                    .setColor("Red")
                    .setTimestamp()
                    .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL() });

                loggingChannel.send({ embeds: [logEmbed] }).catch(() => { });
            }

            break; // only handle the first invite per message
        }
    }
};
