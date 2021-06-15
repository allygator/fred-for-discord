FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY nodemon.json ./
COPY tsconfig.json ./

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000

# CMD [ "npm", "run", "start:dev" ]