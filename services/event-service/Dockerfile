# services/event-service/Dockerfile

FROM node:14

WORKDIR /usr/src/event-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]
