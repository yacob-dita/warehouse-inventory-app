# syntax=docker/dockerfile:1

FROM node:16.5.0

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["node","app.js"]  
