FROM node:latest

RUN mkdir -p /code

ENV NODE_ENV=development

RUN yarn install
RUN yarn add @nuxtjs/axios

WORKDIR /code

EXPOSE 3000