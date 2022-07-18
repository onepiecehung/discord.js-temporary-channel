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
                                    .then((channel) => {
                                    channel.delete(`Voice channel ${channel.name} deleted, powered by DS112`);
                                });
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
                                        .then((channel) => {
                                        channel.delete(`Voice channel ${channel.name} deleted, powered by DS112`);
                                    });
                                }
                                catch (error) {
                                    oldState?.channel.delete();
                                    console.error(error);
                                }
                            }
                            // else {
                            //     // todo: change name
                            //     let matchMember =
                            //         oldState?.channel.members.find(
                            //             (x: any) =>
                            //                 `${this.nameStartWithTemporary}${x.displayName}` ==
                            //                 oldState?.channel?.name
                            //         );
                            //     if (matchMember == null) {
                            //         oldState?.channel.setName(
                            //             `${this.nameStartWithTemporary}${
                            //                 oldState?.channel?.members?.random()
                            //                     .displayName || "Unknown"
                            //             }`
                            //         );
                            //     }
                            // }
                            break;
                        default:
                            // todo: change name
                            // let matchMember =
                            //     oldState?.channel.members.find(
                            //         (x: any) =>
                            //             `${this.nameStartWithTemporary}${x.displayName}` ==
                            //             oldState?.channel?.name
                            //     );
                            // if (matchMember == null) {
                            //     oldState?.channel.setName(
                            //         `${this.nameStartWithTemporary}${
                            //             oldState?.channel.members.random()
                            //                 .displayName
                            //         }`
                            //     );
                            // }
                            break;
                    }
                }
            }
            // todo create channel
            if (newState.channel != null &&
                newState.channel.name.startsWith(this.nameStartWith)) {
                const everyone = newState.guild.roles.everyone;
                newState.guild.channels
                    .create({
                    type: discord_js_1.ChannelType.GuildVoice,
                    name: `${this.nameStartWithTemporary}${newState?.member?.user.username}`,
                    bitrate: newState.channel.bitrate || 64000,
                    topic: this.reason,
                    parent: newState?.channel
                        ?.parent,
                    userLimit: this.userLimit,
                    reason: this.reason,
                    permissionOverwrites: [
                        {
                            id: everyone.id,
                            allow: [discord_js_1.PermissionFlagsBits.ViewChannel],
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
                                    .then((channel) => {
                                    channel.delete(`Voice channel ${channel.name} deleted, powered by DS112`);
                                });
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
                                        .then((channel) => {
                                        channel.delete(`Voice channel ${channel.name} deleted, powered by DS112`);
                                    });
                                }
                                catch (error) {
                                    oldState?.channel.delete();
                                    console.error(error);
                                }
                            }
                            // else {
                            //     // todo: change name
                            //     let matchMember =
                            //         oldState?.channel.members.find(
                            //             (x: any) =>
                            //                 `${this.nameStartWithTemporary}${x.displayName}` ==
                            //                 oldState?.channel?.name
                            //         );
                            //     if (matchMember == null) {
                            //         oldState?.channel.setName(
                            //             `${this.nameStartWithTemporary}${
                            //                 oldState?.channel.members.random()
                            //                     .displayName
                            //             }`
                            //         );
                            //     }
                            // }
                            break;
                        default:
                            // todo: change name
                            // let matchMember =
                            //     oldState?.channel.members.find(
                            //         (x: any) =>
                            //             `${this.nameStartWithTemporary}${x.displayName}` ==
                            //             oldState?.channel?.name
                            //     );
                            // if (matchMember == null) {
                            //     oldState?.channel.setName(
                            //         `${this.nameStartWithTemporary}${
                            //             oldState?.channel.members.random()
                            //                 .displayName
                            //         }`
                            //     );
                            // }
                            break;
                    }
                }
            }
            // todo create channel
            if (newState.channel != null &&
                newState.channel.name.startsWith(this.nameStartWith)) {
                const everyone = newState.guild.roles.everyone;
                newState.guild.channels
                    .create({
                    type: discord_js_1.ChannelType.GuildVoice,
                    name: `${this.nameStartWithTemporary}${newState?.member?.user.username}`,
                    bitrate: newState.channel.bitrate || 64000,
                    topic: this.reason,
                    parent: newState?.channel
                        ?.parent,
                    userLimit: this.userLimit,
                    reason: this.reason,
                    permissionOverwrites: [
                        {
                            id: newState?.member?.user.id,
                            allow: [
                                discord_js_1.PermissionFlagsBits.ViewChannel,
                                discord_js_1.PermissionFlagsBits.Connect,
                                discord_js_1.PermissionFlagsBits.MoveMembers,
                                discord_js_1.PermissionFlagsBits.MuteMembers,
                                discord_js_1.PermissionFlagsBits.Speak,
                                discord_js_1.PermissionFlagsBits.Stream,
                            ],
                        },
                        {
                            id: everyone.id,
                            deny: [
                                discord_js_1.PermissionFlagsBits.ViewChannel,
                                discord_js_1.PermissionFlagsBits.Connect,
                            ],
                        },
                    ],
                })
                    // .create(
                    //     `${this.nameStartWithTemporary}${newState?.member?.user.username}`,
                    //     {
                    //         bitrate: newState.channel.bitrate || 64000,
                    //         type: "GUILD_VOICE",
                    //         topic: this.reason,
                    //         parent: newState?.channel
                    //             ?.parent as CategoryChannelResolvable,
                    //         userLimit: this.userLimit,
                    //         reason: this.reason,
                    //         permissionOverwrites: [
                    //             {
                    //                 id: everyone.id,
                    //                 deny: [
                    //                     Permissions.FLAGS.CONNECT,
                    //                     Permissions.FLAGS.VIEW_CHANNEL,
                    //                 ],
                    //             },
                    //             {
                    //                 id: newState?.member?.user.id as string,
                    //                 allow: [
                    //                     Permissions.FLAGS.CONNECT,
                    //                     Permissions.FLAGS.VIEW_CHANNEL,
                    //                     Permissions.FLAGS.MOVE_MEMBERS,
                    //                     Permissions.FLAGS.MUTE_MEMBERS,
                    //                     Permissions.FLAGS.SPEAK,
                    //                     Permissions.FLAGS.STREAM,
                    //                 ],
                    //             },
                    //         ],
                    //     }
                    // )
                    .then(async (cloneChannel) => {
                    newState.setChannel(cloneChannel);
                });
            }
        });
    }
}
exports.default = CTemporaryVoiceChannel;
