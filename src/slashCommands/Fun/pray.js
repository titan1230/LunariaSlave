const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName('pray')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Pray for someone else!')
                .setRequired(false))
        .setDescription('Pray to the gods for good luck!'),
    /**
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
        const luck = Math.floor(Math.random() * (5 - 0 + 1) + 0);

        if (user.bot) {
            return interaction.editReply('You cannot pray for bots!');
        }

        const getUserLuck = await client.db.prepare("SELECT luck FROM userLuck WHERE userID = ?").get(user.id);

        if (!getUserLuck) {
            await client.db.prepare("INSERT INTO userLuck (userID) VALUES (?)").run(user.id);
        }

        let response = '';

        switch (luck) {
            case 0:
                response = `🙏 ${user.username}, Lunala has ignored your prayers. Better luck next time!`;
                break;
            case 1:
                response = `🙏 ${user.username}, Lunala has heard your prayers but remains indifferent.`;
                break;
            case 2:
                response = `🙏 ${user.username}, Lunala acknowledges your prayers but offers no blessings.`;
                break;
            case 3:
                response = `🙏 ${user.username}, Lunala has granted you a small blessing. Use it wisely!`;
                break;
            case 4:
                response = `🙏 ${user.username}, Lunala has bestowed upon you a great blessing!`;
                break;
            case 5:
                response = `🙏 ${user.username}, Lunala is pleased with your devotion and grants you their favor!`;
                break;
            default:
                response = `🙏 ${user.username}, something went wrong while praying.`;
        }

        response += `\nYou now have ${(getUserLuck ? getUserLuck.luck : 0) + luck} luck.`;

        if (interaction.user.id !== user.id) {
            response = `🙏 ${interaction.user.username} prayed for ${user.username}!\n\n` + response;
        }

        await client.db.prepare("INSERT INTO userLuck (userID) VALUES (?) ON CONFLICT(userID) DO UPDATE SET luck = luck + ?").run(user.id, luck);

        await interaction.editReply(response);
    },
};
