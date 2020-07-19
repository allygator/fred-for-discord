import Discord from "discord.js";

const command = "roll";

/**
 * The possible named result groups from the RegEx
 */
type RollRegexGroup = {
  wow?: string;
  lo?: string;
  hi?: string;
  dnd?: string;
  n?: string;
  d?: string;
};

/**
 * Rolls a dice given the correct format
 * @param message
 */
export function roll(message: Discord.Message) {
  // Make this a promise because we are dealing with math and RegEx which, if abused, could take long.
  return new Promise((resolve) => {
    const messageText = message.content.toLowerCase();

    // Extract the values we want and run the RegEx to parse input.
    const commandArguments = messageText
      .substr(messageText.indexOf(command) + command.length + 1)
      .match(rollRegex);

    // If there is no match, we get null
    if (commandArguments) {
      if (commandArguments.groups?.wow !== undefined) {
        // If our match is a WoW one, it behaves as \roll in WoW
        const { wow, lo, hi } = commandArguments.groups as RollRegexGroup;

        /** Lower boundary. Default 1 */
        const lowerBoundary = Number(lo ?? 1);
        /** Upper boundary. Default 100 */
        const upperBoundary = Number(hi ?? 100);

        const roll =
          Math.floor(Math.random() * (upperBoundary - lowerBoundary + 1)) +
          lowerBoundary;

        if (!Number.isSafeInteger(roll)) {
          // If our math yielded something that isn't a number
          // Maybe because the input includes really large numbers
          resolve(
            message.channel.send(
              `${message.author.toString()} Sorry, I can't roll for that input: ${wow}`
            )
          );
        } else {
          // Math worked out, notifying user about the result
          resolve(
            message.channel.send(
              `${message.author.toString()} rolls **${roll}** (${lowerBoundary}-${upperBoundary})`
            )
          );
        }
      } else if (commandArguments.groups?.dnd !== undefined) {
        // If our match is a DnD one, treat this as a single dice roll with no modifier.
        const { dnd, n, d } = commandArguments.groups as RollRegexGroup;

        /** Number of dice to be rolled. Default 1 */
        const numberOfDice = Number(n ?? 1);
        /** The maximum number to roll. Not optional, but I am tired and TS understands that it may be undefined. */
        const sidesOfDice = Number(d ?? 20);

        // Make sure we can do math with the numbers given.
        // If we can't, tel the user
        if (
          numberOfDice > 10000 ||
          !Number.isSafeInteger(numberOfDice * sidesOfDice)
        ) {
          resolve(
            message.channel.send(
              `${message.author.toString()} Sorry, I can't roll that high! I mean, maybe I can, but I really don't want to: ${dnd}`
            )
          );
          // I don't think the Promise should reject since the process worked as intended in successfully rejecting faulty input
          // But maybe we need a way to notify the parent that that was the case?
          // return reject("Cannot calculate that roll: " + dnd);
        } else {
          // Calculate the dice rolls
          let roll = 0;
          for (let dice = 0; dice < Number(numberOfDice); dice++) {
            roll += Math.floor(Math.random() * Number(sidesOfDice) + 1);
          }
          // Respond to user to inform the result of the roll
          resolve(
            message.channel.send(
              `${message.author.toString()} rolls **${roll}** (${numberOfDice}d${sidesOfDice})`
            )
          );
        }
      }
    } else {
      // Regex did not match, therefore we cannot roll
      resolve(
        message.channel.send(
          message.author.toString() +
            " Sorry, I cannot roll for that; it did not match the RegEx."
        )
      );
      // See comment a few lines above, search for `return reject`
      // return reject(...)
    }
  });
}

// Will match dice rolls and wow rolls
// Thank yo Adam for the RegEx! https://regex101.com/r/LG2LyO/1
const rollRegex = /^(?:(?<wow>(?<lo>\d+\s+)?(?<hi>\d+)?)|(?<dnd>(?<n>\d+)d(?<d>\d+)))$/;
