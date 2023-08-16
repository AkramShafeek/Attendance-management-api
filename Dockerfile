FROM node:18-alpine
ENV NODE_ENV=production\
  PORT=4000\
  MONGO_URI=mongodb+srv://akramshafeek70:akramdb123@mern-cluster.ywovzvh.mongodb.net/\
  JWT_SECRET=mysupersecretstringavengersassemble

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "src/index.js"]