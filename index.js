"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class CTemporaryVoiceChannel {
    client;
    options;
    userLimit;
    nameStartWith;
    nameStartWithTemporary;
    reason;
    constructor(client, options = {}) {
        this.client = client;
        this.options = options;
        // Set default values using nullish coalescing operator
        this.userLimit = options.userLimit ?? 23;
        this.nameStartWith = options.nameStartWith ?? "3AT ";
        this.nameStartWithTemporary = options.nameStartWithTemporary ?? "* ";
        this.reason = options.reason ?? "powered by DS112";
    }
    /**
     * Initializes the voiceStateUpdate listener.
     * This method registers a single listener that handles both public and private temporary channels.
     */
    init() {
        this.client.on("voiceStateUpdate", async (oldState, newState) => {
            try {
                // Process public channels
                await this.handleVoiceStateUpdate(oldState, newState);
                // Process private channels
                // await this.handlePrivateVoiceStateUpdate(oldState, newState);
            }
            catch (error) {
                console.error("Error processing voice state:", error);
            }
        });
    }
    /**
     * Handles public temporary voice channel creation and deletion.
     * - When a user leaves a channel, it checks if the channel is temporary and should be deleted or renamed.
     * - When a user joins a channel whose name starts with the trigger (nameStartWith), a new public temporary channel is created.
     */
    async handleVoiceStateUpdate(oldState, newState) {
        // Handle leaving: only if the user left a channel (i.e. oldState.channel exists and is different from newState.channel)
        if (oldState.channel && oldState.channel !== newState.channel) {
            await this.handleLeave(oldState);
        }
        // Create a new public temporary channel if user joins a channel with the trigger name
        if (newState.channel?.name?.startsWith(this.nameStartWith)) {
            await this.createTemporaryChannel(newState);
        }
    }
    /**
     * Handles private temporary voice channel creation and deletion.
     * The logic is similar to the public one but applies different permission overwrites and naming conventions.
     */
    async handlePrivateVoiceStateUpdate(oldState, newState) {
        if (oldState.channel && oldState.channel !== newState.channel) {
            await this.handlePrivateLeave(oldState);
        }
        if (newState.channel?.name?.startsWith(this.nameStartWith)) {
            await this.createPrivateChannel(newState);
        }
    }
    /**
     * Handles leaving for public temporary channels.
     * If the channel is empty, it gets deleted.
     * If only one member remains, and that member is a bot, the channel is deleted;
     * otherwise, it renames the channel to reflect the remaining member's display name.
     */
    async handleLeave(oldState) {
        const channel = oldState.channel;
        if (!channel || !channel.name?.startsWith(this.nameStartWithTemporary))
            return;
        const memberCount = channel.members.size;
        if (memberCount === 0) {
            try {
                await channel.delete(`Channel empty - ${this.reason}`);
                console.log(`Deleted public channel ${channel.name} because it was empty.`);
            }
            catch (error) {
                console.error("Failed to delete public channel:", error);
            }
        }
        else if (memberCount === 1) {
            const remainingMember = channel.members.first();
            if (!remainingMember)
                return;
            if (remainingMember.user.bot) {
                try {
                    await channel.delete(`Only bot remains - ${this.reason}`);
                    console.log(`Deleted public channel ${channel.name} because only a bot remained.`);
                }
                catch (error) {
                    console.error("Failed to delete public channel:", error);
                }
            }
            else {
                try {
                    await channel.setName(`${this.nameStartWithTemporary}${remainingMember.displayName}`);
                    console.log(`Renamed public channel to ${this.nameStartWithTemporary}${remainingMember.displayName}`);
                }
                catch (error) {
                    console.error("Failed to rename public channel:", error);
                }
            }
        }
    }
    /**
     * Handles leaving for private temporary channels.
     * Similar to public channels, but with a different naming convention.
     */
    async handlePrivateLeave(oldState) {
        const channel = oldState.channel;
        if (!channel || !channel.name?.startsWith(this.nameStartWithTemporary))
            return;
        const memberCount = channel.members.size;
        if (memberCount === 0) {
            try {
                await channel.delete(`Private channel empty - ${this.reason}`);
                console.log(`Deleted private channel ${channel.name} because it was empty.`);
            }
            catch (error) {
                console.error("Failed to delete private channel:", error);
            }
        }
        else if (memberCount === 1) {
            const remainingMember = channel.members.first();
            if (remainingMember && !remainingMember.user.bot) {
                try {
                    await channel.setName(`${this.nameStartWithTemporary}${remainingMember.displayName}'s Room`);
                    console.log(`Renamed private channel to ${this.nameStartWithTemporary}${remainingMember.displayName}'s Room`);
                }
                catch (error) {
                    console.error("Failed to rename private channel:", error);
                }
            }
        }
    }
    /**
     * Creates a new public temporary voice channel and moves the member into it.
     * Ensures the channel name is unique by appending a counter if necessary.
     */
    async createTemporaryChannel(state) {
        const member = state.member;
        const originalChannel = state.channel;
        const guild = state.guild;
        if (!member || !originalChannel || !this.client.user)
            return;
        const permissions = [
            {
                id: guild.roles.everyone.id,
                deny: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.Connect],
            },
            {
                id: member.id,
                allow: [
                    discord_js_1.PermissionFlagsBits.ManageChannels,
                    discord_js_1.PermissionFlagsBits.MoveMembers,
                    discord_js_1.PermissionFlagsBits.MuteMembers,
                    discord_js_1.PermissionFlagsBits.Speak,
                    discord_js_1.PermissionFlagsBits.Stream,
                    discord_js_1.PermissionFlagsBits.Connect,
                ],
            },
            {
                id: this.client.user.id,
                allow: [discord_js_1.PermissionFlagsBits.ManageChannels],
            },
        ];
        // Generate a unique channel name
        let baseName = `${this.nameStartWithTemporary}${member.displayName}`;
        let name = baseName;
        let count = 1;
        while (guild.channels.cache.some((c) => c.name === name)) {
            name = `${baseName} (${count++})`;
        }
        try {
            const newChannel = await guild.channels.create({
                name,
                type: discord_js_1.ChannelType.GuildVoice,
                parent: originalChannel.parent,
                bitrate: originalChannel.bitrate ?? 64000,
                userLimit: this.userLimit,
                permissionOverwrites: permissions,
                reason: this.reason,
            });
            await member.voice.setChannel(newChannel);
            console.log(`Created public temporary channel: ${name} and moved ${member.displayName}`);
        }
        catch (error) {
            console.error("Error creating public temporary channel:", error);
        }
    }
    /**
     * Creates a new private temporary voice channel and moves the member into it.
     * Uses a unique naming strategy to ensure the channel name doesn't conflict.
     */
    async createPrivateChannel(state) {
        const member = state.member;
        const originalChannel = state.channel;
        const guild = state.guild;
        if (!member || !originalChannel || !this.client.user)
            return;
        const permissions = [
            {
                id: guild.roles.everyone.id,
                deny: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.Connect],
            },
            {
                id: member.id,
                allow: [
                    discord_js_1.PermissionFlagsBits.ViewChannel,
                    discord_js_1.PermissionFlagsBits.Connect,
                    discord_js_1.PermissionFlagsBits.Speak,
                    discord_js_1.PermissionFlagsBits.Stream,
                    discord_js_1.PermissionFlagsBits.ManageChannels,
                    discord_js_1.PermissionFlagsBits.MoveMembers,
                ],
            },
            {
                id: this.client.user.id,
                allow: [discord_js_1.PermissionFlagsBits.ManageChannels],
            },
        ];
        let baseName = `${this.nameStartWithTemporary}${member.displayName}'s Room`;
        let name = baseName;
        let count = 1;
        while (guild.channels.cache.some((c) => c.name === name)) {
            name = `${baseName} (${count++})`;
        }
        try {
            const newChannel = await guild.channels.create({
                name,
                type: discord_js_1.ChannelType.GuildVoice,
                parent: originalChannel.parent,
                bitrate: originalChannel.bitrate ?? 64000,
                userLimit: this.userLimit,
                permissionOverwrites: permissions,
                reason: this.reason,
            });
            await member.voice.setChannel(newChannel);
            console.log(`Created private temporary channel: ${name} and moved ${member.displayName}`);
        }
        catch (error) {
            console.error("Error creating private temporary channel:", error);
        }
    }
}
exports.default = CTemporaryVoiceChannel;
