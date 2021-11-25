FROM node:slim
COPY package.json /usr/src/api/package.json
COPY yarn.lock /usr/src/api/yarn.lock
WORKDIR /usr/src/api
RUN ["yarn", "install"]

COPY . /usr/src/api

# Enable wait-for-it
RUN chmod +x ./wait-for-it.sh
