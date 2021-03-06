exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply("Error: Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if (!client.container.commands.has(commandName)) {
        return message.reply("Error: That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.container.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.container.commands.set(commandName, props);
    message.reply(`The command ${commandName} has been reloaded`);
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "reload",
    category: "System",
    description: "Reloads a command that has been modified.",
    usage: "reload [command]"
};