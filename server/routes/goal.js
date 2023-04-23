const express = require('express')
const { newGoal, findGoal, updateGoal, deleteGoal } = require('../controllers/goal')

const router = express.Router()

router.get('/:user_id', findGoal)
router.post('/:user_id', newGoal)
router.patch('/:user_id', updateGoal)
router.delete('/:user_id', deleteGoal)

module.exports = router