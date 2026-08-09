const { EmbedBuilder } = require('discord.js');
const { cacheGuildInvites, getCachedInvites } = require('../utils/inviteCache');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const logChannelId = process.env.LOG_CHANNEL_ID;
        const channel = member.guild.channels.cache.get(logChannelId);
        if (!channel) return;

        const oldInvites = getCachedInvites(member.guild.id);
        let usedInvite = null;

        try {
            const newInvites = await member.guild.invites.fetch();
            usedInvite = newInvites.find(invite => {
                const oldUses = oldInvites.get(invite.code) || 0;
                return invite.uses > oldUses;
            });
        } catch {}

        await cacheGuildInvites(member.guild);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Member Joined', iconURL: member.user.displayAvatarURL() })
            .setDescription(`${member.user} joined the server`)
            .addFields({
                name: 'Invite Used',
                value: usedInvite ? `${usedInvite.code} (by ${usedInvite.inviter?.tag || 'Unknown'})` : 'Unknown'
            })
            .setFooter({ text: `User ID: ${member.id}` })
