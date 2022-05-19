exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply("Error: Must provide a command name to reload.");
    const rollArg = args[0];
    const fullRegExp = /^(?<dieCount>\d*)?[Dd](?<dieSize>\d+)(?:(?<additionSign>[\+\-])(?<additionCount>\d))?(?:(?<keepMode>[Kk][Ll]?)(?<keepCount>\d+))?(?:[Xx](?<multiplyCount>\d+))?(?<sortMode>[Ss][Aa]?)?$/;
    // Check if the roll is valid
    if (fullRegExp.test(rollArg.toLowerCase())) {
        const matches = rollArg.match(fullRegExp);

        //console.log(matches);
        
        let dieCount = parseInt(matches.groups.dieCount);
        let dieSize = parseInt(matches.groups.dieSize);
        let additionSign = matches.groups.additionSign;
        let additionCount = parseInt(matches.groups.additionCount);
        let keepMode = matches.groups.keepMode;
        let keepCount = parseInt(matches.groups.keepCount); 
        let multiplyCount = parseInt(matches.groups.multiplyCount);
        let sortMode = matches.groups.sortMode;

        if (dieCount !== dieCount || dieCount == null) {
            dieCount = 1;
        }

        if (multiplyCount !== multiplyCount || multiplyCount == null) {
            multiplyCount = 1;
        }

        if (additionCount !== additionCount || additionCount == null ) {
            additionCount = 0;
        }

        if (!(dieCount > 0 && dieSize > 0 && dieCount < 1001 && dieSize < 1000001 && multiplyCount > 0 && multiplyCount < 101)) {
            return message.reply(`Error: Invalid arguments (put example args here...) ${dieCount}, ${dieSize}, ${keepMode}, ${keepCount}, ${multiplyCount}, ${sortMode}`);
        }

        if (keepMode != null && keepCount > dieCount) {
            //console.log("\`\`\`Error: Number of dice kept is more than rolled...\`\`\`");
            return message.reply("\`\`\`Error: Number of dice kept is more than rolled...\`\`\`")
        }


        let dieMessage = `Rolling ${dieCount} D${dieSize}'s => `;
        let rolls = [[]];
        let sum = 0;
        let total = 0;

        for (let i = 0; i < multiplyCount; i++) {
            rolls[i] = [];
            for (let j = 0; j < dieCount; j++) {
                rolls[i][j] = Math.floor(Math.random() * dieSize) + 1;
            }
            rolls[i].sort();
            if (keepMode === "k")
                rolls[i].reverse();
        }

        for (let i = 0; i < multiplyCount; i++) {
            dieMessage += "\n[ ";
            sum = 0;
            for (let j = 0; j < dieCount; j++) {
                if (keepMode == null || j < keepCount) {
                    sum += rolls[i][j];
                    dieMessage += `${rolls[i][j]}`;
                }
                else {
                    dieMessage += `~~${rolls[i][j]}~~`;
                }

                if (j !== dieCount - 1) {
                    dieMessage += ', ';
                }

            }
            dieMessage += " ] ";
            if (additionCount !== 0) {
                dieMessage += `${additionSign} ${additionCount} `;
                if (additionSign === '-')
                    additionCount = -additionCount;
                sum += additionCount;
            }
            dieMessage += ` = ${sum}`;
            if (multiplyCount > 1 && i < multiplyCount - 1) {
                dieMessage += " +";
            }
            total += sum;
        }

        if (multiplyCount > 1)
            dieMessage += ` => ${total}`;

        return message.reply(dieMessage);
        //return message.reply("Check logs...");

    }
    else {
        return message.reply("Error: Invalid arguments (put example args here...)");
    }
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["r"],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "roll",
    category: "DnD",
    description: "Virtually rolls dice and returns the total. An example: 4d6k3x6 (Rolls 4 d6, keeping the highest 3, 6 times in total.",
    usage: "roll <dieCount>d[dieSize]<k|kl[keepCount]><x[multiRollCount]>"
};