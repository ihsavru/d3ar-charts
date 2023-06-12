FROM node:14-alpine

WORKDIR /app

RUN apk update && apk add yarn python2 g++ make && rm -rf /var/cache/apk/*

COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

COPY . /app/

CMD yarn run start
