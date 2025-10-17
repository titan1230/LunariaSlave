const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');
const cron = require('node-cron');

module.exports = {
    name: Events.ClientReady,
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

        client.riffy.init(process.env.CLIENTID);

        client.expressApp.listen("20101", () => {
            console.log("Express Backend Started!")
        })

        try {
            client.db.exec("CREATE TABLE IF NOT EXISTS serverChannels (id INTEGER PRIMARY KEY default 1,suggestionChannel varchar(255), loggingChannel varchar(255), suggestionApprovalChannel varchar(255))");
            client.db.exec("CREATE TABLE IF NOT EXISTS userLuck (userID varchar(255) PRIMARY KEY, luck INT default 0)");
            client.db.exec("CREATE TABLE IF NOT EXISTS msg (userID varchar(255) PRIMARY KEY, count INT default 0)");
            client.db.exec("CREATE TABLE IF NOT EXISTS crons (userID varchar(255) PRIMARY KEY, hours INT default 0, minutes INT default 0, message TEXT)");
        } catch (err) {
            console.error("[DB ERROR]", err);
        }

        try {
            const cronRows = await client.db.prepare("SELECT * FROM crons").all();

            for (const row of cronRows) {
                console.log(row)
                cron.schedule(`${row.minutes} ${row.hours} * * *`, async () => {
                    await client.users.fetch(row.userID).then(user => {
                        user.send(`⏰ Daily Reminder: ${row.message}`).catch(console.error);
                    }).catch(console.error);
                }, {
                    timezone: "UTC"
                });
            }
        } catch (err) {
            console.error("[DB ERROR]", err);
        }

        try {
            const res = await client.db.prepare("SELECT * FROM serverChannels WHERE id = 1").get();

            if (res) {
                if (res.suggestionChannel) {
                    client.suggestionChannel = await client.channels.fetch(res.suggestionChannel).catch(() => null);
                    console.log(`Suggestion Channel ID - ${res.suggestionChannel}`);
                } else {
                    client.suggestionChannel = null;
                }

                if (res.loggingChannel) {
                    client.loggingChannel = await client.channels.fetch(res.loggingChannel).catch(() => null);
                    console.log(`Logging Channel ID - ${res.loggingChannel}`);
                } else {
                    client.loggingChannel = null;
                }

                if (res.suggestionApprovalChannel) {
                    client.suggestionApprovalChannel = await client.channels.fetch(res.suggestionApprovalChannel).catch(() => null);
                    console.log(`Suggestion Approval Channel ID - ${res.suggestionApprovalChannel}`);
                } else {
                    client.suggestionApprovalChannel = null;
                }
            }
        } catch (err) {
            console.error("[DB ERROR]", err);
        }
    },
};
