const { SlashCommandBuilder } = require('discord.js');
const { OPENAI_API_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const bannedIDs = []

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Use the AI GPT-3 to create code.')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Be very clear and desciptive.')
				.setRequired(true)),
	async execute(interaction) {
//		if (bannedIDs.includes(interaction.member.user.id)) {
			// If user is in list, stop the
//			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
//		} else {
			const prompt = interaction.options.getString('prompt')
			await interaction.reply({ content: `Creating: **${prompt}**`, fetchReply: true });
			const completion = await openai.createCompletion({
					"model": "code-davinci-002",
					"prompt": prompt,
					"temperature": .6,
					"max_tokens": 200,
					"user": interaction.member.user.id
			})
			interaction.editReply(`**Promt: ${prompt}:**\n >>> ${completion.data.choices[0].text}`);
			//log report in console
			console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${completion.data.choices[0].text}`)
			console.log('code command - completed')
//	}
	},
};

