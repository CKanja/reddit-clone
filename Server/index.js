const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes")
const PostRouter = require("./routes/postRoutes")
const UserRouter = require("./routes/routes")
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(cors())

const username = "ckanja";
const password = "root";
const cluster = "cluster0";
const dbname = "reddit_db";

mongoose.connect(
  process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@${cluster}.upby5.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', (req, res) => {
  res.send('https://app.swaggerhub.com/apis/cloners/Reddit/1.0.0')
});

app.use('/api/v1',UserRouter);
app.use('/api/v1',PostRouter);

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});