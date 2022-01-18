FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install express
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "server.js" ]
