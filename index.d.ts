import { Client } from "discord.js";
type TOptions = {
    userLimit?: number;
    nameStartWith?: string;
    nameStartWithTemporary?: string;
    reason?: string;
};
export default class CTemporaryVoiceChannel {
    protected client: Client;
    protected options: TOptions;
    protected userLimit: number;
    protected nameStartWith: string;
    protected nameStartWithTemporary: string;
    protected reason: string;
    constructor(client: Client, options?: TOptions);
    /**
     * Initializes the voiceStateUpdate listener.
     * This method registers a single listener that handles both public and private temporary channels.
     */
    init(): void;
    /**
     * Handles public temporary voice channel creation and deletion.
     * - When a user leaves a channel, it checks if the channel is temporary and should be deleted or renamed.
     * - When a user joins a channel whose name starts with the trigger (nameStartWith), a new public temporary channel is created.
     */
    private handleVoiceStateUpdate;
    /**
     * Handles private temporary voice channel creation and deletion.
     * The logic is similar to the public one but applies different permission overwrites and naming conventions.
     */
    private handlePrivateVoiceStateUpdate;
    /**
     * Handles leaving for public temporary channels.
     * If the channel is empty, it gets deleted.
     * If only one member remains, and that member is a bot, the channel is deleted;
     * otherwise, it renames the channel to reflect the remaining member's display name.
     */
    private handleLeave;
    /**
     * Handles leaving for private temporary channels.
     * Similar to public channels, but with a different naming convention.
     */
    private handlePrivateLeave;
    /**
     * Creates a new public temporary voice channel and moves the member into it.
     * Ensures the channel name is unique by appending a counter if necessary.
     */
    private createTemporaryChannel;
    /**
     * Creates a new private temporary voice channel and moves the member into it.
     * Uses a unique naming strategy to ensure the channel name doesn't conflict.
     */
    private createPrivateChannel;
}
export {};
