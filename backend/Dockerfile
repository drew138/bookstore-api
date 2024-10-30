FROM node:lts-buster

WORKDIR /usr/src/app

ENV NODE_ENV=production

ENV PORT=5001

ENV AWS_REGION=us-east-1

COPY package.json ./package.json

COPY package-lock.json ./package-lock.json

RUN npm ci

COPY . .

EXPOSE 5001

CMD ["npm", "start"]
