FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000