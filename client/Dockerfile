FROM node:17

WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm install --no-optional

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

EXPOSE $CLIENT_PORT
CMD ["npm", "start"]