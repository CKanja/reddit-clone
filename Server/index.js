const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes")
const PostRouter = require("./routes/postRoutes")
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())

const username = "ckanja";
const password = "root";
const cluster = "cluster0";
const dbname = "reddit_db";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.upby5.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
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

app.use('/api/v1',Router);
app.use('/api/v1',PostRouter);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});