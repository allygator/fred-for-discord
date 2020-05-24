import Discord from "discord.js";
import { prefix, token } from "./config.json";
import { pubSub, ping, imageSearch } from "./commands";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag ?? "<anonymous>"}!`);
});

client.on("message", (message) => {
  const lowerMessage = message.content.toLowerCase();
  if (lowerMessage.split(" ")[0] === prefix) {
    var args = lowerMessage.substring(4).split(" ");
    args = args.splice(1);
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        ping(message);
        break;
      case "pubsub":
        //Are they on sale?
        pubSub(message);
        break;
      case "image":
        imageSearch(message);
        break;
      case "animate":
        imageSearch(message);
        break;
    }
  } else if (message.channel.type === "dm") {
    var args = lowerMessage.split(" ");
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        ping(message);
        break;
      case "pubsub":
        pubSub(message);
        break;
      case "image":
        imageSearch(message);
        break;
      case "animate":
        imageSearch(message);
        break;
    }
  }
});

client.login(token);
