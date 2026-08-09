const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = member.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setDescription(`${member.user} left the server`);

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
