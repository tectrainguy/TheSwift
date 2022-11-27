const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const helpEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Help')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/help', value: 'Get a command list' },
		{ name: '/info', value: 'Server info' },
		{ name: '/vote', value: 'Vote for the server' },
		{ name: '/ping', value: 'Check if the bot is online.' },
	)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
		console.log('Help command - completed')
	},
};