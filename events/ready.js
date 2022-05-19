const config = require("../config.json");

module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);

    client.user.setActivity(`${config.prefix}help`, { type: "PLAYING" });
}