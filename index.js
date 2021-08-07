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
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.userLimit = options?.userLimit ? options?.userLimit : 23;
        this.nameStartWith = options?.nameStartWith
            ? options?.nameStartWith
            : "3AT ";
        this.nameStartWithTemporary = options?.nameStartWithTemporary
            ? options?.nameStartWithTemporary
            : "* ";
        this.reason = options?.reason ? options?.reason : "powered by DS112";
    }
    async autoCreateTemporaryVoiceChannel() {
        this.client.on("voiceStateUpdate", (oldState, newState) => {
            // ! leave
            const isLeave = oldState?.channel != undefined;
            // todo: check member leave
            if (isLeave) {
                if (oldState?.channel?.name.startsWith(this.nameStartWithTemporary)) {
                    switch (oldState?.channel?.members.size) {
                        case 0:
                            try {
                                oldState?.channel
                                    .fetch()
                                    .then((channel) => channel.delete());
                            }
                            catch (error) {
                                oldState?.channel.delete();
                            }
                            break;
                        case 1:
                            const isBot = oldState?.channel.members.find((x) => x.user.bot == true);
                            if (isBot) {
                                try {
                                    oldState?.channel
                                        .fetch()
                                        .then((channel) => channel.delete());
                                }
                                catch (error) {
                                    oldState?.channel.delete();
                                    console.error(error);
                                }
                            }
                            else {
                                // todo: change name
                                let matchMember = oldState?.channel.members.find((x) => `${this.nameStartWithTemporary}${x.displayName}` ==
                                    oldState?.channel?.name);
                                if (matchMember == null) {
                                    oldState?.channel.setName(`${this.nameStartWithTemporary}${oldState?.channel.members.random()
                                        .displayName}`);
                                }
                            }
                            break;
                        default:
                            // todo: change name
                            let matchMember = oldState?.channel.members.find((x) => `${this.nameStartWithTemporary}${x.displayName}` ==
                                oldState?.channel?.name);
                            if (matchMember == null) {
                                oldState?.channel.setName(`${this.nameStartWithTemporary}${oldState?.channel.members.random()
                                    .displayName}`);
                            }
                            break;
                    }
                }
            }
            // todo create channel
            if (newState.channel != null &&
                newState.channel.name.startsWith(this.nameStartWith)) {
                const everyone = newState.guild.roles.everyone;
                newState.guild.channels
                    .create(`${this.nameStartWithTemporary}${newState?.member?.user.username}`, {
                    bitrate: newState.channel.bitrate || 64000,
                    type: "GUILD_VOICE",
                    topic: this.reason,
                    parent: newState?.channel
                        ?.parent,
                    userLimit: this.userLimit,
                    reason: this.reason,
                    permissionOverwrites: [
                        {
                            id: everyone.id,
                            allow: [discord_js_1.Permissions.FLAGS.VIEW_CHANNEL],
                        },
                    ],
                })
                    .then(async (cloneChannel) => {
                    newState.setChannel(cloneChannel);
                });
            }
        });
    }
    async autoCreateTemporaryVoiceChannelPrivate() {
        this.client.on("voiceStateUpdate", (oldState, newState) => {
            // ! leave
            const isLeave = oldState?.channel != undefined;
            // todo: check member leave
            if (isLeave) {
                if (oldState?.channel?.name.startsWith(this.nameStartWithTemporary)) {
                    switch (oldState?.channel?.members.size) {
                        case 0:
                            try {
                                oldState?.channel
                                    .fetch()
                                    .then((channel) => channel.delete());
                            }
                            catch (error) {
                                oldState?.channel.delete();
                            }
                            break;
                        case 1:
                            const isBot = oldState?.channel.members.find((x) => x.user.bot == true);
                            if (isBot) {
                                try {
                                    oldState?.channel
                                        .fetch()
                                        .then((channel) => channel.delete());
                                }
                                catch (error) {
                                    oldState?.channel.delete();
                                    console.error(error);
                                }
                            }
                            else {
                                // todo: change name
                                let matchMember = oldState?.channel.members.find((x) => `${this.nameStartWithTemporary}${x.displayName}` ==
                                    oldState?.channel?.name);
                                if (matchMember == null) {
                                    oldState?.channel.setName(`${this.nameStartWithTemporary}${oldState?.channel.members.random()
                                        .displayName}`);
                                }
                            }
                            break;
                        default:
                            // todo: change name
                            let matchMember = oldState?.channel.members.find((x) => `${this.nameStartWithTemporary}${x.displayName}` ==
                                oldState?.channel?.name);
                            if (matchMember == null) {
                                oldState?.channel.setName(`${this.nameStartWithTemporary}${oldState?.channel.members.random()
                                    .displayName}`);
                            }
                            break;
                    }
                }
            }
            // todo create channel
            if (newState.channel != null &&
                newState.channel.name.startsWith(this.nameStartWith)) {
                const everyone = newState.guild.roles.everyone;
                newState.guild.channels
                    .create(`${this.nameStartWithTemporary}${newState?.member?.user.username}`, {
                    bitrate: newState.channel.bitrate || 64000,
                    type: "GUILD_VOICE",
                    topic: this.reason,
                    parent: newState?.channel
                        ?.parent,
                    userLimit: this.userLimit,
                    reason: this.reason,
                    permissionOverwrites: [
                        {
                            id: everyone.id,
                            deny: [
                                discord_js_1.Permissions.FLAGS.CONNECT,
                                discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
                            ],
                        },
                        {
                            id: newState?.member?.user.id,
                            allow: [
                                discord_js_1.Permissions.FLAGS.CONNECT,
                                discord_js_1.Permissions.FLAGS.VIEW_CHANNEL,
                                discord_js_1.Permissions.FLAGS.MOVE_MEMBERS,
                                discord_js_1.Permissions.FLAGS.MUTE_MEMBERS,
                                discord_js_1.Permissions.FLAGS.SPEAK,
                                discord_js_1.Permissions.FLAGS.STREAM,
                            ],
                        },
                    ],
                })
                    .then(async (cloneChannel) => {
                    newState.setChannel(cloneChannel);
                });
            }
        });
    }
}
exports.default = CTemporaryVoiceChannel;
