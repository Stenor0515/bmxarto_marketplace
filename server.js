import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'


// DB connection setting

const MONGODB_URL = process.env.MONGODB_URL

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URL,
  {
    useNewUrlParser: true,
  }
)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });


const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/Frontend/build/index.html');
});

let PORT = process.env.PORT

// Include files for routes
require('./app/routes/app.routes.js')(app);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

