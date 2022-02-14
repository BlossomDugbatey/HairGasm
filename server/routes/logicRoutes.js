const express = require('express')

const controller = require('../controllers/logicControllers')
const router = express.Router()

router.get('/', controller.index)

// router.get("/add", controller.add);
// router.post("/add", controller.save);

//lunch logic
router.get("/lunch-selection", controller.lunch);
router.post("/lunch-selection", controller.lunchDecision);

//number guess game
router.get("/number-guess", controller.numberGuess);
router.post("/number-guess", controller.numberGuessResult);

module.exports = router;