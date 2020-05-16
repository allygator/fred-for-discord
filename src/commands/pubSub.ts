import Discord from "discord.js";
import fetch from "node-fetch";

const yesResponses = [
  "They're back, baby!",
  "Yes they are!",
  "Get your butt to Publix!",
  "Yes. Yes they are.",
  "They are, until they aren't. Hurry!",
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

/**
 * Investigates wether or not Publix PubSubs are on sale and responds to the caller
 * @param {Discord.Messaage} message
 */
export function pubSub(message: Discord.Message): Promise<void> {
  return fetch("http://www.arepublixchickentendersubsonsale.com/")
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
      message.channel.send("Shits broke, Im not fixing it. probably.");
    });
}
