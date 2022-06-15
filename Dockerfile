# syntax=docker/dockerfile:1

FROM node:16.5.0

COPY . /app

WORKDIR /app

RUN npm install

CMD ["node","app.js"]  
