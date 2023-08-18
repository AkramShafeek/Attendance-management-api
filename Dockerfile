FROM node:18-alpine
ENV NODE_ENV=production\
  PORT=4000\
  JWT_SECRET=mysupersecretstringavengersassemble

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "src/index.js"]