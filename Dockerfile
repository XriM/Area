FROM node:17

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --no-optional

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]
