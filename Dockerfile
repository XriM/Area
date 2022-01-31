# FROM node:10-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# RUN apk --no-cache add --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
#   npm install --quiet node-gyp -g

# WORKDIR /home/node/app

# COPY package*.json ./

# USER node

# RUN npm install express dotenv pg jsonwebtoken
# RUN npm install nodemon
# RUN npm install

# COPY --chown=node:node . .

# RUN source .envrc

# EXPOSE 3000

# CMD [ "npm", "start" ]

FROM node:17

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --no-optional

COPY . .

EXPOSE $PORT
CMD ["npm", "start"]
