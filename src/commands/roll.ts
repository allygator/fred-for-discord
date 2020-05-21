import Discord from "discord.js";

const command = "roll";

/**
 * Rolls a dice given the correct format
 * @param message
 */
export function roll(message: Discord.Message) {
  // Make is a promise because we are dealing with math and RegEx
  return new Promise((resolve, reject) => {
    const messageText = message.content.toLowerCase();

    // Extract the values we want
    const commandArguments = messageText
      .substr(messageText.indexOf(command) + command.length + 1)
      .match(diceRollRegex);

    // If there is no match, we get null
    if (commandArguments) {
      const [
        input,
        _numberOfDice,
        _rollTop,
        _modifier,
        reason,
      ] = commandArguments;

      /** Number of dice to be rolled. Default 1 */
      const numberOfDice = _numberOfDice ? Number(_numberOfDice) : 1;
      /** The maximum number to roll. Not optional. */
      const rollTop = Number(_rollTop);
      /** Modifier to be added at the end of the roll. Default 0. */
      const modifier = _modifier ? Number(_modifier) : 0;

      // Make sure we can do math with the numbers given
      if (
        numberOfDice > 10000 ||
        !Number.isSafeInteger(numberOfDice * rollTop + modifier + numberOfDice)
      ) {
        message.channel.send(
          message.author.toString() +
            " Sorry, I can't roll that high! I mean, I can, but I really don't want to."
        );
        return reject("Cannot calculate that roll: " + input);
      }

      // Calculate the dice rolls
      let roll = 0;
      for (let dice = 0; dice < Number(numberOfDice); dice++) {
        roll += Math.floor(Math.random() * Number(rollTop) + 1);
      }

      // Add modifier
      roll += Number(modifier);

      // Respond to user
      resolve(
        message.channel.send(
          `${message.author.toString()} **${roll}** ${
            reason ? "for " + reason : ""
          }`
        )
      );
    } else {
      reject(
        "Cannot roll for the given value. Arguments did not match expected format."
      );
    }
  });
}

// Will match dice rolls as well as basic rolls and catch a reason
const diceRollRegex = /(?:(\d+)d)?(\d+) ?([\+\-]\d+)?(?: ?for )?(.+)?/;
