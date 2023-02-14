const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');





//embeds with ccommands
const helpEmbed1 = new EmbedBuilder()
	.setColor(0x5c95b5)
	.setTitle('User')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/help', value: 'Get a command list' },
		{ name: '/ai', value: 'Use AI to generate text, images and code' },
		{ name: '/info', value: 'Server info' },
		{ name: '/ping', value: 'Check if the bot is online' },
		{ name: '/security', value: 'Create passwords and decrypt/encrypt strings.' },
		{ name: '/rps', value: 'Play rock, paper, scissors with the bot.' },
		{ name: '/vote', value: 'Vote for the bot' },
		{ name: '/stack', value: 'Search for your issue on StackOverflow and return the top post' },
		{ name: '/report', value: 'Report an issue to the staff team.' },
		{ name: '/role', value: 'Get roles.' },
		{ name: '/voteserver', value: 'Vote for the current server.' },
	)
	.setFooter({ text: 'Page 1/2' })
	.setTimestamp()

	const helpEmbed2 = new EmbedBuilder()
	.setColor(0x5c95b5)
		.setTitle('Admin/Moderator')
		.setDescription('Supported commands')
		.addFields(
			{ name: '/warn', value: 'Warns a user.' },
			{ name: '/warns', value: 'Gets all warns in the server of for a user.' },
			{ name: '/removewarns', value: 'Remove a warn.' },
			{ name: '/timeout', value: `Timeouts a user (up to 28 days)` },
			{ name: '/purge', value: `Removes the specified number of messages from a channel` },
			{ name: '/settings', value: `Modify settings for the bot` },
		)
		.setFooter({ text: 'Page 3/3' })
		.setTimestamp()


//buttons
const row = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('1')
		.setLabel('<<')
		.setStyle(ButtonStyle.Primary))
.addComponents(
	new ButtonBuilder()
		.setCustomId('2')
		.setLabel('>>')
		.setStyle(ButtonStyle.Primary),
);

const inactiverow = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('page1')
		.setLabel('Most Used')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(true))
.addComponents(
	new ButtonBuilder()
		.setCustomId('page2')
		.setLabel('Admin/Moderator')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(true)
);



module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.')
		.addIntegerOption(option =>
            option
                .setName('page')
                .setDescription('Page of the command list.')
                .setRequired(true)
				.addChoices(
					{ name: 'User', value: 1 },
					{ name: 'Admin/Moderator', value: 2 },
				)),
	async execute(interaction) {
		const page = await interaction.options.getInteger('page')
		if (page == '1') {
		await interaction.reply({ embeds: [helpEmbed1], components: [row] })
		} else if (page == '2') {
		await interaction.reply({ embeds: [helpEmbed2], components: [row] })
		}
		const filter = i => i.user.id === interaction.user.id;
		let text1 = 'helpEmbed';
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
		
		collector.on('collect', async i => {
			if (i.customId === '1') {
				var page = await interaction.options.getInteger('page')
				var page = await page - 1
				const current = 'helpEmbed' + page
				console.log(current)
				await i.update({ embeds: [{current}], components: [row] });
			} else if (i.customId === '2') {
				var page = await interaction.options.getInteger('page')
				var page = await page + 1
				const current = 'helpEmbed' + page
				console.log(current)
				await i.update({ embeds: [{current}], components: [row] });
			}
		});

		await collector.on('end', collected => console.log(`Collected ${collected.size} items`, interaction.editReply({components: [inactiverow] }))),
		console.log('Help command - completed')
	},
};
			
