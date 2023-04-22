const express = require('express')
const { newGoal } = require('../controllers/goal')

const router = express.Router()

router.post('/', newGoal)

module.exports = router