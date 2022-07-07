FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY nodemon.json ./
COPY tsconfig.json ./
# COPY .env ./

RUN npm install

EXPOSE 3000