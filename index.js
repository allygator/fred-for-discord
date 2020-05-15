const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
const fetch = require("node-fetch");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", (message) => {
  lowerMessage = message.content.toLowerCase();
  if (lowerMessage.substring(0, 4) === prefix) {
    var args = lowerMessage.substring(4).split(" ");
    args = args.splice(1);
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        message.channel.send("Pong");
        break;
      case "pubsub":
        const yesResponses = [
          "They're back, baby!",
          "Yes they are!",
          "Get your butt to Publix!",
          "Yes.  Yes they are.",
          "They are, until they aren't.  Hurry!",
          "chickentendersub.onSale = true",
        ];
        const noResponses = [
          "Sorry to disappoint.",
          "Not right now, unfortunately.",
          "Hate to be the bearer of bad news...",
          "Nope.",
          "Don't shoot the messenger bot, but no.",
          "Not at this time.",
          "Outlook seems dim.",
          "Maybe next week.",
        ];
        //Are they on sale?
        fetch("http://www.arepublixchickentendersubsonsale.com/")
          .then((res) => res.text())
          .then((body) => {
            if (body.includes("onsale:no")) {
              message.channel.send(
                noResponses[Math.floor(Math.random() * noResponses.length)]
              );
            } else {
              message.channel.send(
                yesResponses[Math.floor(Math.random() * noResponses.length)]
              );
            }
          })

          .catch((error) => {
            console.log(error);
          });

        break;
    }
  } else if (message.channel.type === "dm") {
    var args = lowerMessage.split(" ");
    var cmd = args[0];
    switch (cmd) {
      // fred ping
      case "ping":
        message.channel.send("Pong");
        break;
      case "pubsub":
        const yesResponses = [
          "They're back, baby!",
          "Yes they are!",
          "Get your butt to Publix!",
          "Yes.  Yes they are.",
          "They are, until they aren't.  Hurry!",
          "chickentendersub.onSale = true",
        ];
        const noResponses = [
          "Sorry to disappoint.",
          "Not right now, unfortunately.",
          "Hate to be the bearer of bad news...",
          "Nope.",
          "Don't shoot the messenger bot, but no.",
          "Not at this time.",
          "Outlook seems dim.",
          "Maybe next week.",
        ];
        //Are they on sale?
        fetch("http://www.arepublixchickentendersubsonsale.com/")
          .then((res) => res.text())
          .then((body) => {
            if (body.includes("onsale:no")) {
              message.channel.send(
                noResponses[Math.floor(Math.random() * noResponses.length)]
              );
            } else {
              message.channel.send(
                yesResponses[Math.floor(Math.random() * noResponses.length)]
              );
            }
          })

          .catch((error) => {
            console.log(error);
          });

        break;
    }
  }
});
client.login(token);
