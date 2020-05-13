const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (message) => {
  if (message.content.substring(0, 4) === prefix) {
    console.log("message");
    var args = message.content.substring(4).split(" ");
    args = args.splice(1);
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
