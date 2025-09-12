const { MessageFlags, TextDisplayBuilder, ContainerBuilder } = require('discord.js');
const config = require('../../config/config.json');
const roleIDs = require('../../config/roles.json');

module.exports = {
    name: 'interactionCreate',
    sub: 'reactionRolesEvent',
    once: false,
    /**
   * @param {import('discord.js').Client} client 
   * @param {import('discord.js').ButtonInteraction} interaction 
   */
    async execute(client, interaction) {
        try {
            if (interaction.isChatInputCommand()) return;

            // Block commands in DMs
            if (!interaction.guild) {
                const accentColor = parseInt(config.color.replace('#', ''), 16);
                const dmBlock = new ContainerBuilder()
                    .setAccentColor(accentColor)
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(`${config.crossmark_emoji} This command can only be used in a server.`)
                    );

                return interaction.reply({
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                    components: [dmBlock],
                });
            }

            const id = interaction.customId;

            switch (id) {
                case 'male_role':
                    const maleRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.male_role);

                    if (!maleRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.male_role)) {
                        await interaction.member.roles.remove(maleRole);
                        return interaction.reply({ content: `Removed the <@&${maleRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(maleRole);
                    return interaction.reply({ content: `Added the <@&${maleRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'female_role':
                    const femaleRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.female_role);

                    if (!femaleRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.female_role)) {
                        await interaction.member.roles.remove(femaleRole);
                        return interaction.reply({ content: `Removed the <@&${femaleRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(femaleRole);
                    return interaction.reply({ content: `Added the <@&${femaleRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'they_role':
                    const theyRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.they_role);
                    if (!theyRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.they_role)) {
                        await interaction.member.roles.remove(theyRole);
                        return interaction.reply({ content: `Removed the <@&${theyRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(theyRole);
                    return interaction.reply({ content: `Added the <@&${theyRole.id}> role.`, flags: MessageFlags.Ephemeral });
                
                case 'rather_not_say_role':
                    const rnsRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.rather_not_say_role);

                    if (!rnsRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.rather_not_say_role)) {
                        await interaction.member.roles.remove(rnsRole);
                        return interaction.reply({ content: `Removed the <@&${rnsRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(rnsRole);
                    return interaction.reply({ content: `Added the <@&${rnsRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'mobile_role':
                    const mobileRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.mobile_role);

                    if (!mobileRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.mobile_role)) {
                        await interaction.member.roles.remove(mobileRole);
                        return interaction.reply({ content: `Removed the <@&${mobileRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(mobileRole);
                    return interaction.reply({ content: `Added the <@&${mobileRole.id}> role.`, flags: MessageFlags.Ephemeral });
                
                case 'laptop_role':
                    const laptopRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.laptop_role);

                    if (!laptopRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.laptop_role)) {
                        await interaction.member.roles.remove(laptopRole);
                        return interaction.reply({ content: `Removed the <@&${laptopRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(laptopRole);
                    return interaction.reply({ content: `Added the <@&${laptopRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'age_18_role':
                    const age18Role = interaction.guild.roles.cache.find(role => role.id === roleIDs.age_18_role);

                    if (!age18Role) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.age_18_role)) {
                        await interaction.member.roles.remove(age18Role);
                        return interaction.reply({ content: `Removed the <@&${age18Role.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(age18Role);
                    return interaction.reply({ content: `Added the <@&${age18Role.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'age_u18_role':
                    const ageU18Role = interaction.guild.roles.cache.find(role => role.id === roleIDs.age_u18_role);

                    if (!ageU18Role) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.age_u18_role)) {
                        await interaction.member.roles.remove(ageU18Role);
                        return interaction.reply({ content: `Removed the <@&${ageU18Role.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(ageU18Role);
                    return interaction.reply({ content: `Added the <@&${ageU18Role.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'announcement_pings_role':
                    const announcementPingsRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.announcement_pings_role);
                    if (!announcementPingsRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.announcement_pings_role)) {
                        await interaction.member.roles.remove(announcementPingsRole);   
                        return interaction.reply({ content: `Removed the <@&${announcementPingsRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(announcementPingsRole);
                    return interaction.reply({ content: `Added the <@&${announcementPingsRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'giveaway_pings_role':
                    const giveawayPingsRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.giveaway_pings_role);

                    if (!giveawayPingsRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.giveaway_pings_role)) {
                        await interaction.member.roles.remove(giveawayPingsRole);
                        return interaction.reply({ content: `Removed the <@&${giveawayPingsRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(giveawayPingsRole);
                    return interaction.reply({ content: `Added the <@&${giveawayPingsRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'event_pings_role':
                    const eventPingsRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.event_pings_role);
                    if (!eventPingsRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.event_pings_role)) {
                        await interaction.member.roles.remove(eventPingsRole);
                        return interaction.reply({ content: `Removed the <@&${eventPingsRole.id}> role.`, flags: MessageFlags.Ephemeral }); 
                    }

                    await interaction.member.roles.add(eventPingsRole);
                    return interaction.reply({ content: `Added the <@&${eventPingsRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'raffles_role':
                    const rafflesRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.raffles_role);

                    if (!rafflesRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.raffles_role)) {
                        await interaction.member.roles.remove(rafflesRole);
                        return interaction.reply({ content: `Removed the <@&${rafflesRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(rafflesRole);
                    return interaction.reply({ content: `Added the <@&${rafflesRole.id}> role.`, flags: MessageFlags.Ephemeral });

                case 'gamblers_role':
                    const gamblersRole = interaction.guild.roles.cache.find(role => role.id === roleIDs.gamblers_role);
                    if (!gamblersRole) {
                        return interaction.reply({ content: 'Role not found on the server.', flags: MessageFlags.Ephemeral });
                    }

                    if (interaction.member.roles.cache.get(roleIDs.gamblers_role)) {
                        await interaction.member.roles.remove(gamblersRole);
                        return interaction.reply({ content: `Removed the <@&${gamblersRole.id}> role.`, flags: MessageFlags.Ephemeral });
                    }

                    await interaction.member.roles.add(gamblersRole);
                    return interaction.reply({ content: `Added the <@&${gamblersRole.id}> role.`, flags: MessageFlags.Ephemeral });

                default:
                    return
            }

        } catch (err) {
            console.error('[INTERACTION ERROR]', err);

            if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
                const errorBlock = new ContainerBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent('An unexpected error occurred while handling this interaction.')
                    );
                interaction.reply({
                    flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
                    components: [errorBlock],
                }).catch(console.error);
            }
        }
    },
};
