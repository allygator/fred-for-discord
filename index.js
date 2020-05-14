const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (message) => {
  lowerMessage = message.content.toLowerCase();
  if (lowerMessage.substring(0, 4) === prefix) {
    var args = lowerMessage.content.substring(4).split(" ");
    args = args.splice(1);
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        message.channel.send("Pong");
        break;
    }
  } else if (message.channel.type === "dm") {
    var args = lowerMessage.substring(0).split(" ");
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        message.channel.send("Pong");
        break;
    }
  }
});
client.login(token);
