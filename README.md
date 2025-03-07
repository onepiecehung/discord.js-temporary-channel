# Discord.js Temporary Voice Channel

[![NPM Version](https://img.shields.io/npm/v/discord.js-temporary-channel?style=flat-square)](https://www.npmjs.com/package/discord.js-temporary-channel) [![Downloads](https://img.shields.io/npm/dt/discord.js-temporary-channel?style=flat-square)](https://www.npmjs.com/package/discord.js-temporary-channel)

A lightweight library for automatically creating temporary voice channels in Discord servers using Discord.js v14+.  
It supports automatic channel creation when users join a designated "trigger" channel, along with deletion/renaming when channels become empty.

## Features

- **Automatic Channel Creation:**  
  Creates a new temporary voice channel when a user joins a trigger channel (whose name starts with a specified prefix).

- **Automatic Channel Management:**  
  Deletes the channel if it becomes empty; if only one member remains (and that member is not a bot), renames the channel accordingly.

- **Customizable Options:**  
  Configure user limit, naming conventions, and reason for audit logs.

- **Unique Channel Naming:**  
  Ensures channel names are unique by appending a counter if necessary.

- **Public and Private Channels:**  
  (Currently, the private channel logic is available but commented out. You can enable it by adjusting your implementation.)

## Installation

Install via npm or yarn:

```bash
npm install discord.js discord.js-temporary-channel
# or
yarn add discord.js discord.js-temporary-channel
```
## Usage

Below is an example of how to integrate the library into your Discord bot:

```typescript
import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import CTemporaryVoiceChannel from "discord.js-temporary-channel";

// Create a Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Channel],
});

// Configure options for temporary voice channels
const options = {
  userLimit: 23, // Maximum number of users (up to 99)
  nameStartWith: "3AT ", // Trigger channel name prefix
  nameStartWithTemporary: "* ", // Prefix for temporary channels
  reason: "powered by DS112", // Reason for channel actions (audit logs)
};

// Initialize the temporary voice channel handler
const tempVC = new CTemporaryVoiceChannel(client, options);

// Register the voiceStateUpdate listener to handle channel creation/deletion
tempVC.init();

// If you wish to enable private temporary channels,
// you can modify the implementation to uncomment or integrate the private channel methods.
// e.g., tempVC.initPrivate();

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.login("YOUR_BOT_TOKEN");
```

## API Reference

### `constructor(client: Client, options?: TOptions)`

- **Parameters:**
  - `client`: A Discord.js Client instance.
  - `options` (optional): Configuration object.
    - `userLimit`: Maximum number of users allowed in a temporary channel (default: `23`, capped at `99`).
    - `nameStartWith`: The trigger prefix for the base channel (default: `"3AT "`).
    - `nameStartWithTemporary`: The prefix used for temporary channels (default: `"* "`).
    - `reason`: Reason string for channel creation/deletion (default: `"powered by DS112"`).

### `init(): void`

- Registers a single `voiceStateUpdate` listener that processes channel events:
  - **Public Channels:**  
    Calls `handleVoiceStateUpdate` to create a temporary channel when a user joins a trigger channel, and to handle channel deletion/renaming when users leave.
  - **Private Channels:**  
    The private channel logic is implemented in `handlePrivateVoiceStateUpdate` (currently commented out in the code). You can enable it as needed.

### Internal Methods

- **`handleVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): Promise<void>`**  
  Handles public temporary channel creation and deletion based on voice state changes.

- **`handlePrivateVoiceStateUpdate(oldState: VoiceState, newState: VoiceState): Promise<void>`**  
  (Private channel logic) Handles creation and deletion of private temporary channels.

- **`handleLeave(oldState: VoiceState): Promise<void>`**  
  Deletes or renames a public temporary channel when a user leaves.

- **`handlePrivateLeave(oldState: VoiceState): Promise<void>`**  
  Handles deletion or renaming of a private temporary channel when a user leaves.

- **`createTemporaryChannel(state: VoiceState): Promise<void>`**  
  Creates a new public temporary channel and moves the user into it.  
  Generates a unique channel name by appending a counter if necessary.

- **`createPrivateChannel(state: VoiceState): Promise<void>`**  
  Creates a new private temporary channel and moves the user into it, using a similar unique naming strategy.

## Customization & Advanced Usage

- **Default Category:**  
  When creating a temporary channel, if the original channel’s parent (category) is not set, consider modifying the code to provide a default category ID.

- **Auto-Deletion Timer:**  
  You can extend the functionality by adding a timer to automatically delete a channel after a period of inactivity.

- **Private Channels:**  
  Private temporary channel functionality is implemented separately. To enable it, adjust your initialization to call the private channel methods as needed.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests on the [GitHub repository](https://github.com/YOUR_USERNAME/discord.js-temporary-channel).

## License

This project is licensed under the [MIT License](LICENSE).

```
