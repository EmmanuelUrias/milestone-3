const express = require('express')
const { newGoal, findGoal, updateGoal, deleteGoal } = require('../controllers/goal')
const { tokenVerification } = require('../middleware/auth')

const router = express.Router()

router.get('/:user_id', tokenVerification, findGoal)
router.post('/:user_id', tokenVerification, newGoal)
router.patch('/:user_id', tokenVerification, updateGoal)
router.delete('/:user_id', tokenVerification, deleteGoal)

module.exports = router