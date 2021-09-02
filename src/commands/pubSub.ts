import Discord from "discord.js";
import fetch from "node-fetch";

const yesResponses = [
  "They're back, baby!",
  "Yes they are!",
  "Get your butt to Publix!",
  "Yes. Yes they are.",
  "They are, until they aren't. Hurry!",
  "publixSub.onSale = true",
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

/**
 * Investigates wether or not Publix PubSubs are on sale and responds to the caller
 * @param {Discord.Messaage} message
 */
export function pubSub(message: Discord.Message, commandArgs: String[]){
  /**
   Cycles through random pubsubs  
  */
  console.log(commandArgs.length)
  if(commandArgs.length == 1){
    return fetch("https://api.pubsub-api.dev/subs/?name=random")
    .then((res) => res.json())
    .then((body) => {
      let subData = body[0]
      console.log(typeof(subData["sub_name"]))
      let subName = subData["sub_name"].replace(/-/g, " ")
      if(subData["status"] == "False"){
        message.channel.send(
          noResponses[Math.floor(Math.random() * noResponses.length)] + " " + subName + " hasn't been on sale since " + subData["last_sale"]  + " for the price of " + subData["price"]
        );
      }
      else if (subData["status"] == "True") {
        message.channel.send(
          yesResponses[Math.floor(Math.random() * noResponses.length)] + " " + subName + " is on sale right now till " + subData["last_sale"]  + " for the price of " + subData["price"]
        );
      }
    })
    .catch((error) => {
      console.log(error);
      message.channel.send("Shits broke, Im not fixing it. probably.");
    });
  }
  /*
  Grabs the info for the particular sub, images are optional to add.
  */
  else if(commandArgs.length >= 2){
    console.log(commandArgs[1])
    let subName = commandArgs.slice(1, commandArgs.length).join("-")
    return fetch("https://api.pubsub-api.dev/subs/?name="+ subName)
    .then((res) => res.json())
    .then((body) => {
      let subData = body[0]
      let subName = subData["sub_name"].replace(/-/g, " ")
      if(subData["status"] == "False"){
        message.channel.send(
          noResponses[Math.floor(Math.random() * noResponses.length)] + " " + subName + " hasn't been on sale since " + subData["last_sale"]  + " for the price of " + subData["price"]
        );
      }
      else if (subData["status"] == "True") {
        message.channel.send(
          yesResponses[Math.floor(Math.random() * noResponses.length)] + " " + subName + " is on sale right now till " + subData["last_sale"]  + " for the price of " + subData["price"]
        );
      }
    })
    .catch((error) => {
      console.log(error);
      message.channel.send("Shits broke, Im not fixing it. probably.");
    });
  }
}

