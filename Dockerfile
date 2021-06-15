FROM node:14

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY nodemon.json ./
COPY tsconfig.json ./
# COPY .env ./

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000