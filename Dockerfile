FROM node:24-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install --ignore-optional --silent

EXPOSE 3000
EXPOSE 3001

CMD ["yarn", "start"]
