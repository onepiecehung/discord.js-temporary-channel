<div align="center">
  <p>
    <a href="https://nodei.co/npm/discord.js-temporary-channel/">
    <img src="https://nodei.co/npm/discord.js-temporary-channel.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

# Discord.js-Temporary-Channel (Only for voice channel)

### Support npm: https://discord.gg/TfG5hep

### Thanks to Pie from RDVN

```npm
npm i discord.js-temporary-channel
yarn add discord.js-temporary-channel
```

```javascript
const Discord = require("discord.js");
const client = new Discord.Client();
const tempChannel = require("discord.js-temporary-channel");

//just call API
tempChannel.autoCreateChannel(client,{
    userLimit = Number || user limit voice channel , default 17
    reason = String || Reason create channel, default "powered by ds112",
    nameStartsWith = String || name startWith channel, default "+ ",
    nameStartsWithTemp = String || name startWith Temp channel, default "* "
})

client.login("YOUR_DISCORD_APP_TOKEN")
```

# API

## autoCreateChannelOnTop(): channel temp always on top.
