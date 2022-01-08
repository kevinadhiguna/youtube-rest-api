FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY server.js .
COPY models/ models/
COPY routes/ routes/

EXPOSE 4000

CMD [ "yarn", "start" ]