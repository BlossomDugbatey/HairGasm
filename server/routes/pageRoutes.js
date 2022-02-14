//require express
const express = require('express')
//requiring our appController file 
const controller = require('../controllers/pageController')
//creating a variable that holds object for declaring routes within applications 
const router = express.Router()

router.get('/', controller.home)

module.exports = router;