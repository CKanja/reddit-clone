const _ = require('lodash');
const userModel = require('../models/users')
const express = require("express");
const User = require("../models/users");
const app = express();
const jwt = require('jsonwebtoken')

// Endpoint to add a new user
exports.add_user = async (request, response) => {

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


};

// Retrieve users 
exports.list_users = async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
};


exports.login = async (request, response) => {
    const user = await userModel.findOne({
        email: request.body.email,
        password: request.body.password,
    })

    if (user) {

            const token = jwt.sign(
            {
                email: user.email
            }, 
            'topsecret250'
        )

        return response.json({status:"ok", user: token })
    } else {
        return response.json({status:"error", user: false })
    }
}


// Exporting the endpoints
// module.exports = app;