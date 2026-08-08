const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = member.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setTitle('Member Left')
            .setColor(0xE74C3C)
            .setDescription(`${member.user.tag}`)
            .setTimestamp();

        channel.send({ embeds: [embed] }).catch(() => {});
    }
};
