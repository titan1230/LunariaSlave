const client = require('../index');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
    const commands = [];

    // Read all directories in ./src/commands
    const commandFolders = fs.readdirSync(path.join(__dirname, '../commands'));

    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(path.join(__dirname, `../commands/${folder}`))
            .filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const commandPath = path.join(__dirname, `../commands/${folder}/${file}`);
            const command = require(commandPath);

            // Validate command
            if (!command.name || !command.execute) {
                console.warn(`[WARNING] The command at ${commandPath} is missing a required "name" or "execute" property.`);
                continue;
            }

            // Skip commands that have skip flag
            if (command.skip) continue;

            // Store in client's messageCommands collection
            client.messageCommands.set(command.name, command);
            commands.push(command.name);

            console.log(`[COMMAND LOADED] ${command.name} from ${folder}/${file}`);
        }
    }

    console.log(`✅ Loaded ${commands.length} commands.`);
};
