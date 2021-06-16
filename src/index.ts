import Discord from "discord.js";
import { prefix, token } from "./config.json";
import {
  pubSub,
  ping,
  imageSearch,
  location,
  keys,
  register,
  unregister,
  address,
  // react,
  addUser,
} from "./commands";

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const bot_id = "709966127777972245";

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag ?? "<anonymous>"}!`);
});

client.on("message", (message: Discord.Message) => {
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
      case "animate":
        imageSearch(message);
        break;
      case "where":
        location(message);
        break;
      case "keys":
        keys(message);
        break;
      case "register":
        register(message);
        break;
      case "unregister":
        unregister(message);
        break;
      case "address":
        address(message);
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
      case "animate":
        imageSearch(message);
        break;
      case "where":
        location(message);
        break;
      case "keys":
        keys(message);
        break;
      case "register":
        register(message);
        break;
      case "unregister":
        unregister(message);
        break;
      case "address":
        address(message);
        break;
    }
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  // // Now the message has been cached and is fully available
  // console.log(
  //   `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
  // );
  // // The reaction is now also fully available and the properties will be reflected accurately:
  // console.log(
  //   `${reaction.count} user(s) have given the same reaction to this message!`
  // );
  // console.log(reaction.emoji.name);
  if (reaction.emoji.name === "✅") {
    console.log("accepted");
    addUser(reaction.message, user);
  } else if (reaction.emoji.name === "❎") {
    console.log("declined");
  }
  console.log(user.username);
});

client.login(token);
