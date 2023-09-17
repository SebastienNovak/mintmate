# services/artist-service/Dockerfile

FROM node:14

WORKDIR /usr/src/artist-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]
