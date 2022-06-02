const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Check commands list',
    execute: async (client, interaction) => {
        const commands = client.slashCommands.toJSON();
        const commandList = commands.map(command => `\`${command.name}\``).join(', ');
        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setAuthor({ name: `${client.user.username} Help`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription('This is my available commands list\n\n'+commandList);
        interaction.reply({ embeds: [embed] });
    }
};
