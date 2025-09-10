// /button-1
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  ButtonBuilder, 
  ButtonStyle, 
  SectionBuilder, 
  TextDisplayBuilder, 
  ContainerBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  skip:true,
  data: new SlashCommandBuilder()
    .setName('button-1')
    .setDescription('Shows a Link Button (old style).'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // Create a link button that opens Discord docs
    const button = new ButtonBuilder()
      .setLabel('Discord Docs')                                 // Button text
      .setURL('https://discord.com/developers/docs/components/overview') // URL to open
      .setStyle(ButtonStyle.Link);                              // Must be Link style

    // SectionBuilder combines text and a button accessory
    const section = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('🔗 Click the button below to view Discord docs!')
      )
      .setButtonAccessory(button); // Attach the link button to the section

    // ContainerBuilder holds the section (and optionally multiple sections)
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)       // Optional accent color
      .addSectionComponents(section); // Add the section to the container

    // Reply to the interaction using v2 components
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Enable v2 components
      components: [container],            // Send the container
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /button-1
    // 2. Container: Holds one or more sections (v2 style).
    // 3. Section: Can contain text (TextDisplayBuilder) and a button accessory.
    // 4. Button: Link button to external URL (Discord docs here).
    // 5. Flags: MessageFlags.IsComponentsV2 is required for v2 components.
    // 6. Usage: User runs /button-1 → sees the text + click-able link button.
    // 7. Customization: Change .setLabel(), .setURL(), or section text to your own content.
  },
};
