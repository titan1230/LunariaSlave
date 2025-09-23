const {
    Client,
    CommandInteraction,
    SlashCommandBuilder,
    MessageFlags,
    ContainerBuilder,
    SeparatorBuilder,
    TextDisplayBuilder,
    SeparatorSpacingSize,
    ButtonBuilder,
    ButtonStyle,
    SectionBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("search")
        .addStringOption(option => option.setName("query").setDescription("The song to search for").setRequired(true))
        .setDescription("Search for a song."),
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const query = interaction.options.getString('query');

        await interaction.deferReply({ flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral });

        if (!interaction.member.voice.channel) return interaction.reply({components: [new TextDisplayBuilder().setContent("You must be in a voice channel to use this command.")], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2});
        
        if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channel.id !== interaction.member.voice.channel.id) {
            return interaction.editReply({ components: [new TextDisplayBuilder().setContent("Join my VC to run this command.")], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
        }


        const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = resolve;

        const chosen = tracks.slice(0, 5);

        if (loadType !== 'search') {
            return interaction.editReply({ content: "No results found.", flags: MessageFlags.Ephemeral });
        }

        const container = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent("## Search Results")
            )
            .addSeparatorComponents(new SeparatorBuilder().setDivider(false), { spacing: SeparatorSpacingSize.Small, divider: false })

        chosen.map((obj) => {
            const section = new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(`[${obj.info.title}](${obj.info.uri})`)
                )
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setLabel('Select')
                        .setCustomId(obj.info.uri)
                        .setStyle(ButtonStyle.Primary)
                )

            container.addSectionComponents(section)
        })

        const sent = await interaction.editReply({
            components: [container],
            flags: MessageFlags.IsComponentsV2
        });

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = sent.createMessageComponentCollector({ filter, time: 60000, max: 1 });

        collector.on('collect', async (i) => {
            await i.deferUpdate();

            const track = tracks.find(t => t.info.uri === i.customId);
            track.info.requester = interaction.member;
            
            const player = client.riffy.createConnection({
                guildId: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                deaf: true,
            });

            player.queue.add(track);

            await interaction.editReply({ components: [new TextDisplayBuilder().setContent(`Added **${track.info.title}** to the queue.`)] });

            if (!player.playing && !player.paused) return player.play();
        });

        collector.on('end', async (collected) => {
            await interaction.editReply({ components: [new TextDisplayBuilder().setContent("Time Up")] });
        });
    }
}