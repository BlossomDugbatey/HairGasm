//require express
const express = require('express')

//require bookingController file
const controller = require('../controllers/bookingController')
const router = express.Router()

//user
// router.get('/', controller.user)
// router.get('/add-User', controller.addUser)


//booking
router.get('/', controller.booking)
router.get('/add-booking/:slot_id', controller.add)
router.post('/add-booking/:slot_id', controller.save)

//for user
router.post('/update-user', controller.updateUser)

module.exports = router;