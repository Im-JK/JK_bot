const Discord = require('discord.js');

const client = new Discord.Client();

const { MessageEmbed } = require("discord.js");

let messageRemembered = "";

const prefix = 'jk';

const embedColor = 1752220;

var commandList = {help:"`"+prefix+"help`",attack:"`"+prefix+"attack <person>`", userinfo:"`"+prefix+"userinfo <person>`", iq:"`"+prefix+"iq <person>`", remember:"`"+prefix+"remember [<message>||<clear>]?`"};

client.once('ready', () => {
    console.log('JK_bot is online!');
    client.user.setActivity("– "+prefix+"help", {type: "PLAYING"});
});
client.on("message", (help) => {
    if (!help.content.startsWith(prefix) || help.author.bot) return;

    const args = help.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == "help" || command == "") {
        help.channel.send(new MessageEmbed().setTitle("**Commands for JK_bot**").setDescription(commandList.help+"\n"+commandList.attack+"\n"+commandList.userinfo+"\n"+commandList.iq+"\n"+commandList.remember).setColor(embedColor));
    }
})
client.on("message", (attack) => {
    if (!attack.content.startsWith(prefix) || attack.author.bot) return;

    const args = attack.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == "attack") {
        if (args.length == 0) {
            attack.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription(commandList.attack).setColor(embedColor));
        } else {
            var target = "";
            for (const word in args) {
                var target = target + args[word] + " ";
            }
            let person = attack.mentions.members.first();
            attack.delete(attack);
            attack.channel.send(new MessageEmbed().setDescription(`<@${attack.author.id}> has attacked ${target}`).setColor(embedColor));
        }

    }
})
client.on("message", (userinfo) => {
    if(!userinfo.content.startsWith(prefix) || userinfo.author.bot) return;

    const args = userinfo.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == "userinfo") {
        if (args.length == 0) {
            userinfo.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription(commandList.userinfo).setColor(embedColor));
        } else {
            let target = userinfo.mentions.members.first();
            userinfo.channel.send(new MessageEmbed().setTitle("**"+target.user.tag+"**").setDescription("**Joined Discord at:** " + target.user.createdAt + "\n**Avatar:**").setImage(target.user.avatarURL()).setColor(embedColor));
        }
    }
})
client.on("message", (iq) => {
    if(!iq.content.startsWith(prefix) || iq.author.bot) return;

    const args = iq.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == "iq") {
        if (args.length == 0) {
            iq.channel.send(new MessageEmbed().setTitle("**Incorrect Usage!**").setDescription(commandList.iq).setColor(embedColor));
        } else {
            let target = iq.mentions.members.first();
            iq.channel.send(new MessageEmbed().setTitle("**IQ CALCULATOR**").setDescription(`${target} has a IQ of ` + "**" + Math.floor(Math.random() * 300) + "**").setColor(embedColor));
        }
    }
})
client.on("message", (remember) => {
    if(!remember.content.startsWith(prefix) || remember.author.bot) return;

    const args = remember.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if (command == "remember") {
        if (args.length == 0) {
            remember.channel.send(new MessageEmbed().setTitle("**Messages Remembered**").setDescription("*" + messageRemembered + "*").setColor(embedColor));
        } else {
            messageRemembered = messageRemembered + ", " + remember.content.slice(prefix.length + 9);
            if (remember.content.slice(prefix.length + 9) == "clear"){
                messageRemembered = "";
            }
            remember.channel.send(new MessageEmbed().setTitle("**Understood!**").setColor(embedColor));
        }
    }
})
client.login('Hidden');
