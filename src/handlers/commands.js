async function loadCommands(instance, client) {
	const { loadFiles } = require('../utils/fileLoader');
	const path = require('path');

	await client.commands.clear();

	const commandsArray = [];
	const commandsGuild = [];

	const Files = await loadFiles('commands');

	Files.forEach((file) => {
		const command = require(file);
		const category = path.basename(path.dirname(file));
		command.category = category;

		client.commands.set(command.data.name, command);

		if (command.developer) {
			commandsGuild.push(command.data.toJSON());
		} else {
			commandsArray.push(command.data.toJSON());
		}

		console.log(`Command: ${command.data.name} ✅`);
	});

	client.application.commands.set(commandsArray);

	for (const guild of instance.config.testGuilds) {
		client.application.commands.set(commandsGuild, guild);
	}
}

module.exports = { loadCommands };
