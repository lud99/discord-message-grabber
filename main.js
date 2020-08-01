const fetch = require("node-fetch");
const fs = require("fs");

const authorization = process.argv.indexOf("--authorization") > -1 ? process.argv[process.argv.indexOf("--authorization") + 1] : null;
const channelId = process.argv.indexOf("--channelId") > -1 ? process.argv[process.argv.indexOf("--channelId") + 1] : null;
const count = process.argv.indexOf("--count") > -1 ? parseInt(process.argv[process.argv.indexOf("--count") + 1]) : null;
const filename = process.argv.indexOf("--filename") > -1 ? process.argv[process.argv.indexOf("--filename") == -1 ? 0 : 1] : "messages.json";
const getAll = process.argv.includes("--all") || (count == null);

console.log(authorization, channelId, count, filename, getAll);

var allMessages = [];

var messagesFetched = 0;

const getMessages = async (auth, count, channelId, beforeMessageId, callback) => {
    if (messagesFetched >= count)
        return callback();

    const response = await fetch(`https://discord.com/api/v6/channels/${channelId}/messages?limit=100${(beforeMessageId ? "&before=" + beforeMessageId : "")}`, {
        headers: {
            authorization: auth
        },
    });

    const messages = await response.json(); 

    allMessages = allMessages.concat(messages);

    messagesFetched++;

    // If an error occurs here, all messages have been grabbed
    try {
        getMessages(auth, count, channelId, messages[messages.length - 1].id, callback);
    } catch (error) {
        return callback();
    }   
}

const start = async () => {
    await getMessages(authorization, getAll ? 1000000000000 : count, channelId, null, () => {
        console.log(allMessages.length);

        fs.writeFileSync(filename, JSON.stringify(allMessages));
    });
}

start();