const express = require("express");
const Comment = require("../models/comments");
const postModel = require("../models/posts");
const app = express();

// Endpoint to add a new post
app.post("/add_post", async (request, response) => {
    const post = new postModel(request.body);
  
    try {
      await post.save();
      response.send(post);
    } catch (error) {
    //   response.status(500).send(error){message:error};
      response.status(500).send({ message: error.toString()})
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

// Retrieve a post by ID
app.get("/posts/:postId", async (request, response) => {
  try {
    const postId = request.params.postId
    console.log(postId)
      const post = await postModel.findById({_id: postId });  
      
      
      if (post){
        return response.status(200).json({
        success: true,
        data: post,
        });
      } else {
          return response.status(404).json({
          success: false,
          message: `There is no post at id: ${postId}`
        });
      }
     
  } catch (error) {
    // response.status(500).send(error);
    response.status(500).send({ message: error.toString()});
  }
});

// Retrieve comments of a post

app.get("/posts/:postId/comments", async (request, response) => {
  try {
    const postId = request.params.postId
    console.log(postId)
      const post = await postModel.findById({_id: postId });  
      
      
      if (post){
        return response.status(200).json({
        success: true,
        data: post["comments"]
        });
      } else {
          return response.status(404).json({
          success: false,
          message: `There is no post at id: ${postId}`
        });
      }
     
  } catch (error) {
    // response.status(500).send(error);
    response.status(500).send({ message: error.toString()});
  }
});

// Endpoint to increment upvotes
app.put("/posts/:postId/upvotes", async (request, response) => {
    const post = new postModel(request.body.upvotes);
  
    try {
      await post.save();
      response.send(post);
    } catch (error) {
    //   response.status(500).send(error){message:error};
      response.status(500).send({ message: error.toString()})
    }
});


// Retrieve number of upvotes
app.get("/posts/:postId/upvotes", async (request, response) => {
  try {
    const postId = request.params.postId
    console.log(postId)
      const post = await postModel.findById({_id: postId });  
      
      
      if (post){
        return response.status(200).json({
        success: true,
        data: post["upvotes"]
        });
      } else {
          return response.status(404).json({
          success: false,
          message: `There is no post at id: ${postId}`
        });
      }
     
  } catch (error) {
    // response.status(500).send(error);
    response.status(500).send({ message: error.toString()});
  }
});

// Retrieve number of downvotes
app.get("/posts/:postId/downvotes", async (request, response) => {
  try {
    const postId = request.params.postId
    console.log(postId)
      const post = await postModel.findById({_id: postId });  
      
      
      if (post){
        return response.status(200).json({
        success: true,
        data: post["downvotes"]     
        });
      } else {
          return response.status(404).json({
          success: false,
          message: `There is no post at id: ${postId}`
        });
      }
     
  } catch (error) {
    // response.status(500).send(error);
    response.status(500).send({ message: error.toString()});
  }
});

// Edit a post
app.put('/posts/:postId', async (request, response) => {
    if(!request.body) {
        response.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = request.params.postId;
    
    await postModel.findByIdAndUpdate(id, request.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            return response.status(404).send({
                message: `There is no post at id: ${id}`
            });
        }else{
            // response.send({ message: "Task updated successfully." })
            //return res.status(204);
             return response.status(200).send({
             success: true,
             message: "Post updated successfully."
           
            // message: `There is no task at id: ${taskId}`
      }) 
      return;
        }
    }).catch(err => {
        response.status(500).send({
            message: err.message
        });
    });
});

// Delete a post
app.delete('/posts/:postId', async (request, response) => {
    try{ 
    // look up course, not found raise 404
      const postId = request.params.postId
      console.log(postId)
      
      const post = await postModel.findByIdAndRemove({ _id: postId }); 
    
    if(post) {
      // taskModel.splice(task, 1);
      console.log("deleted!");
      // return res.send(task);
      // return res.status(204)
      response.status(204).send({
            message: "Data to update can not be empty!"
        });
    }
   
    else {
      return response.status(204).json({
      success: false,
      message: `There is no post at id: ${postId}`
      }) 
    }
  
     } catch(error) {
        //   response.status(500).send(error);
          response.status(500).send({ message: error.toString()});
  }
});


// Exporting the endpoints
module.exports = app;