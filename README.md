# discord-message-grabber
A simple node.js tool to get all discord messages from a specific channel, group or user

# How to use
```npm install```

```node main.js --authorization <Your discord authentication> --channelId <The channel you wish to get messages from> --count <[Optional] (Default is to get all messages)> --filename <[Optional] (Default is messages.json)>```

The authentication can be found by inspecting the discord page and watching the network tab while triggering an API request. Then look at the request headers for that request and the authentication should be there. 

The channel id is in the url when visiting a channel, group or direct messages. Example: ```https://discordapp.com/channels/@me/<The channel id>```
