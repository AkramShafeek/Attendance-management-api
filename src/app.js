// config
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');

// express
const express = require('express');
const app = express();

// mongo db connection function
const connectToMongo = require('./database/connectToMongo');

// error handler middleware
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// routes
const adminRouter = require('./routes/adminRoutes');
const facultyRouter = require('./routes/facultyRoutes');

// head middlewares
app.use(cors());
app.use(express.json());

// routes config
app.use('/api/v1/admin/', adminRouter);
app.use('/api/v1/faculty/', facultyRouter);

// test route
app.get("/test", (req, res) => {
  res.status(200).send("Hello world");
})

// error handling for 404
app.use('*', (req, res) => {
  throw new Error("Route doesn't exist");
})

// config error handling
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4001;

const startServer = async () => {
  try {
    console.log("Connecting to db");
    await connectToMongo(process.env.MONGO_URI);
    console.log("Connected to database successfully");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    return ;
    console.log("Couldn't start server due to some error");
    console.log(error);
  }
}

startServer();

// export app to index.js to start the server
module.exports = app;