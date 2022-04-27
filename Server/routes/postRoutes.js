const express = require("express");
const postModel = require("../models/posts");
const app = express();

// Endpoint to add a new post
app.post("/add_post", async (request, response) => {
    const post = new postModel(request.body);
  
    try {
      await post.save();
      response.send(post);
    } catch (error) {
      response.status(500).send(error);
    }
});

// Retrieve posts 
app.get("/posts", async (request, response) => {
  const posts = await postModel.find({});

  try {
    response.send(posts);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Exporting the endpoints
module.exports = app;