const express = require("express");
const User = require("../models/users");
const userModel = require("../models/users");
const app = express();

// Endpoint to add a new user
app.post("/add_user", async (request, response) => {
    // const user = new userModel(request.body);
  
    // try {
    //   await user.save();
    //   response.send(user);
    // } catch (error) {
    //   response.status(500).send(error);
    // }

    console.log(request.body)
    try{ 
        const user = await User.create({
            username: request.body.name,
            email: request.body.email,
            password: request.body.password

        })
        response.json({status: 'ok'})
    } catch (err) {
        response.json({status:'error', error:'Duplicate email'})
    }


});

// Retrieve users 
app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


app.post("/login", async (request, response) => {
    const user = await User.findOne({
        email: request.body.email,
        password: request.body.password,
    })

    if (user) {
        return response.json({status:"ok", user: true })
    } else {
        return response.json({status:"error", user: false })
    }
})


// Exporting the endpoints
module.exports = app;