import Discord from "discord.js";
import { searchId, googleToken } from "../config.json";
import { prefix } from "../config.json";
import fetch from "node-fetch";

/**
 * Initiates a google image search on specified term and responds with a link to the image
 * @param {Discord.Messaage} message
 */
export function imageSearch(message: Discord.Message): Promise<void> {
  var searchTerm = message.content.split(" ");
  for (let i = 0; i < searchTerm.length; i++) {
    if (
      searchTerm[i] == "image" ||
      searchTerm[i].toLowerCase() == prefix ||
      searchTerm[i] == "animate"
    ) {
      searchTerm.splice(i, 1);
      i--;
    }
  }
  var formattedsearch = searchTerm.join("%20");
  var num = Math.floor(Math.random() * 10);
  var type =
    message.content.split(" ")[1] == "animate" ? "&imgType=animated" : "";
  // Search parameters at https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
  return fetch(
    "https://www.googleapis.com/customsearch/v1?key=" +
      googleToken +
      "&cx=" +
      searchId +
      "&searchType=image" +
      type +
      "&q=" +
      formattedsearch
  )
    .then((res) => res.json())
    .then((data) => {
      message.channel.send(
        "search term: " + searchTerm.join(" ") + " \n" + data.items[num].link
      );
    })
    .catch((error) => {
      console.log(error);
      message.channel.send(
        "Shits broke, Im not fixing it. probably. <@116415248935682049>"
      );
    });
}
