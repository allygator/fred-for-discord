![Pull repo changes and Rebuild TS](https://github.com/allygator/fred-for-discord/workflows/Pull%20repo%20changes%20and%20Rebuild%20TS/badge.svg)

# fred-for-discord

The fam has moved to Discord so we are reincarnating Fred to Discord as well

Fred's abilities include:

- `Ping`
  - Replies "Pong"
- `Pubsub`
  - Replies with a version of yes or no to whether or not pub subs are on sale
- `Image searchTerm`
  - Replies with an image from google image search of the specified search term
- `Animate searchTerm`
  - Replies with an animated image from google image search of the specified search term
- `Where`
  - Replies with the hostname of the machine fred is running from
- `Keys [dungeon [level]]`
  - Without arguments, returns rows from the database of previously logged keys in the format `User dungeon level`
  - With arguments, returns "Noted" and logs the specified key to the database.
  - **Users can only have one key listed at a time**

Fred's future abilities:

- Roll X (Where x is a number)
  - Replies with a random number between 0-X

# Development

Fred runs in docker, with a postgres database connection using [Prisma](https://www.prisma.io/).

To run fred, create a copy of `.env.template`, renaming it to `.env` then change `(IPADDRESS)` to the IP address of your machine. Create a copy of `/src/config.template.json` renaming it to `config.json`. Replace the placeholders with their respective keys.

To start the docker containers run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

After starting the containers run `docker-compose exec bot npx prisma migrate deploy` to setup the database.

Changes made to any file in `/src` will update inside the docker container. Changes made to `/prisma/schema.prisma` require running the above exec command before changes are reflected in the database.
