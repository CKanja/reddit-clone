var express = require('express')
var userController = require('../controllers/userControllers')
var router = express.Router()

 
// add user
router.post("/add_user", userController.add_user)

// lsit all users
router.get("/users", userController.list_users)

// login
router.post("/login", userController.login)


module.exports = router