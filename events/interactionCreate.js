module.exports = (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
    try {
        slashCommand.execute(client, interaction);
    }
    catch(error) {
        console.error(error);
    }
};
