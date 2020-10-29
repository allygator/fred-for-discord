import Discord from "discord.js";
import { weatherAPI } from "../config.json";
import fetch from "node-fetch";

/**
 * Initiates a google image search on specified term and responds with a link to the image
 * @param {Discord.Messaage} message
 */
export function weather(message: Discord.Message) {
  var searchTerm = message.content.split(" ");
  searchTerm = searchTerm.splice(2);
  // Search parameters at https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list
  return fetch(
    "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" +
      weatherAPI +
      "&q=" +
      searchTerm
  )
    .then((res) => res.json())
    .then((data) => data[0].Key)
    .then((key) => {
      fetch(
        "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
          key +
          "?apikey=" +
          weatherAPI
      )
        .then((res) => res.json())
        .then((data) => {
          for (const day in data.DailyForecasts) {
            console.log(data.DailyForecasts[day].Date);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      message.channel.send(
        "Shits broke, Im not fixing it. probably. <@116415248935682049>"
      );
    });
}
