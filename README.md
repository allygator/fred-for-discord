![Pull repo changes and Rebuild TS](https://github.com/allygator/fred-for-discord/workflows/Pull%20repo%20changes%20and%20Rebuild%20TS/badge.svg)

# fred-for-discord

The fam has moved to Discord so we are reincarnating Fred to Discord as well

Fred's abilities include:

- Ping
  - Replies "Pong"
- Pubsub
  - Replies with a version of yes or no to whether or not pub subs are on sale
- Image (search term)
  - Replies with an image from google image search of the specified search term
- Animate (search term)
  - Replies with an animated image from google image search of the specified search term
- Where
  - Replies with the hostname of the machine fred is running from

Fred's future abilities:

- Roll X (Where x is a number)
  - Replies with a random number between 0-X

# Development

Fred runs in docker, with a postgres database connection using [Prisma](https://www.prisma.io/).

To run fred, change `(IPADDRESS)` in `.\prisma\schema.prisma` to the IP address of your machine.

To start the docker containers run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
If you are restarting the containers, youll have the `postgres-data` directory on your machine, this directory needs to be deleted before restarting the containers.

After starting the containers run `docker-compose exec bot npx prisma migrate dev` to setup the database inside docker.

Changes made to any file in `/src` will update inside the docker container. Changes made to `/prisma/schema.prisma` require running an exec command of your choosing (options available in the [Prisma CLI](https://www.prisma.io/docs/reference/api-reference/command-reference) to update the database.

## Limitations

Prisma requires the host machine be 64-bit. This repo will not run on a 32-bit OS.
