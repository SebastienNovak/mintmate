# services/payment-service/Dockerfile

FROM node:14

WORKDIR /usr/src/payment-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
