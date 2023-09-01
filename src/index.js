// importing app
const app = require('./app');

// database connection
const connectToMongo = require('./database/connectToMongo');

const PORT = process.env.PORT || 4001;

const startServer = async () => {
  try {
    await connectToMongo(process.env.MONGO_URI);
    console.log("Connected to database successfully");
    console.log("Demo print 1 SEP")
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log("Couldn't start server due to some error");
    console.log(error);
  }
}

startServer();


