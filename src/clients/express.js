const express = require('express');
const db = require('./sqlite')


/**
 * @param {import('discord.js').Client} client 
 */
module.exports = (client) => {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.send('Bot is running!');
    });

    app.get('/hour', async (req, res) => {
        const pass = req.query.pass;

        if (!pass || pass != process.env.pass) {
            res.send("Unauthorized").status(401)
        }

        let s, s1, s2, s3, s4, s5, se;

        let response;
        try {
            response = await db.prepare(`SELECT * FROM msg ORDER BY count DESC LIMIT 5`).all()
        } catch { }

        s = `︵︵︵︵︵︵︵︵︵︵︵︵︵︵︵\n. • ☆ . °__**Chit-Chat Leaderboard   **__s°:. *₊ ° .\n︶︶︶︶︶︶︶︶︶︶︶︶︶︶︶\n\n─ ･ ｡ Updated <t:${Math.round(Date.now() / 1000)}:R>\n\n╭୧ ✎ ‧₊ — — — — — — — ₊˚ ˊ˗\n`;
        s1 = `┊ ・1. ${response[0] ? `<@${response[0].userID}>\n` : "\n"}`
        s2 = `┊ ・2. ${response[1] ? `<@${response[1].userID}>\n` : "\n"}`
        s3 = `┊ ・3. ${response[2] ? `<@${response[2].userID}>\n` : "\n"}`
        s4 = `┊ ・4. ${response[3] ? `<@${response[3].userID}>\n` : "\n"}`
        s5 = `┊ ・5. ${response[4] ? `<@${response[4].userID}>\n` : "\n"}`
        se = `╰・─・─・─・─・─・─・─・─・₊˚`


        const guild = await client.guilds.fetch(process.env.GUILD_ID)
        const channel = await guild.channels.fetch(process.env.CHANNEL_ID)
        const message = await channel.messages.fetch(process.env.MESSAGE_ID)

        message.edit({ content: s + s1 + s2 + s3 + s4 + s5 + se })

        res.send('Updated!')
    });


    client.expressApp = app;
}