# Use Node image to build React app
FROM node:18 as build

WORKDIR /usr/src/app

RUN apt-get update

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGO_URI
ARG PORT

ENV MONGO_URI=$MONGO_URI
env PORT=$PORT

EXPOSE $PORT


CMD ["npm", "start"]
