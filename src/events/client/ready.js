const { ActivityType } = require('discord.js');

module.exports = {
    name: 'clientReady',
    once: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     */
    async execute(client) {
        const tag = client.user.tag;
        const boxTitle = `BOT READY`;
        const boxMessage = `Logged in as ${tag}`;
        const maxLength = Math.max(boxTitle.length, boxMessage.length) + 4;
        console.log(`╔${'─'.repeat(maxLength)}╗`);
        console.log(`║ ${boxTitle.padEnd(maxLength - 2)} ║`);
        console.log(`╠${'─'.repeat(maxLength)}╣`);
        console.log(`║ ${boxMessage.padEnd(maxLength - 2)} ║`);
        console.log(`╚${'─'.repeat(maxLength)}╝`);

        client.user.setPresence({
            status: 'online',
            activities: [{
                name: 'the world burn 🔥',
                type: ActivityType.Watching,
            }],
        });

        try {
            client.db.exec("CREATE TABLE IF NOT EXISTS serverChannels (id INTEGER PRIMARY KEY default 1,suggestionChannel varchar(255), loggingChannel varchar(255), suggestionApprovalChannel varchar(255))");
        } catch (err) {
            console.error("[DB ERROR]", err);
        }

        try {
            const res = client.db.prepare("SELECT * FROM serverChannels WHERE id = 1").get();

            if (res) {
                if (res.suggestionChannel) {
                    client.suggestionChannel = await client.channels.fetch(res.suggestionChannel).catch(() => null);
                    console.log(`Suggestion Channel ID - ${res.suggestionChannel}`);
                }

                if (res.loggingChannel) {
                    client.loggingChannel = await client.channels.fetch(res.loggingChannel).catch(() => null);
                    console.log(`Logging Channel ID - ${res.loggingChannel}`);
                }

                if (res.suggestionApprovalChannel) {
                    client.suggestionApprovalChannel = await client.channels.fetch(res.suggestionApprovalChannel).catch(() => null);
                    console.log(`Suggestion Approval Channel ID - ${res.suggestionApprovalChannel}`);
                }
            }
        } catch (err) {
            console.error("[DB ERROR]", err);
        }
    },
};
