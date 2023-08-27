// config
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');

// express
const express = require('express');
const app = express();

// error handler middleware
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// routes
const adminRouter = require('./routes/adminRoutes');
const facultyRouter = require('./routes/facultyRoutes');
const studentRouter = require('./routes/studentRoutes');

// head middlewares
app.use(cors());
app.use(express.json());

// routes config
app.use('/api/v1/admin/', adminRouter);
app.use('/api/v1/faculty/',facultyRouter);
app.use('/api/v1/student/',studentRouter);

// test route
app.get("/test", (req, res) =>  {
  res.status(200).send("Hello world");
})

// error handling for 404
app.use('*', (req, res) => {
  throw new Error("Route doesn't exist");
})

// config error handling
app.use(errorHandlerMiddleware);

// export app to index.js to start the server
module.exports = app;