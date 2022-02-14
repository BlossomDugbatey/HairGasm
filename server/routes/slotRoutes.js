//require express
const express = require('express')

//requiring our appController file 
const controller = require('../controllers/slotController')

const router = express.Router()


router.get('/', controller.slot)
router.get('/add-slot', controller.addSlot)
router.post('/add-slot', controller.saveSlot)
// router.post('/update', csrfProtection, controller.updateSlot)

module.exports = router;