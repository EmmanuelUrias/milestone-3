const express = require('express')
const { getExpenses, getThisMonthsExpenses, newExpense, updateExpense, deleteExpense } = require('../controllers/expense')
const { tokenVerification } = require('../middleware/auth')

const router = express.Router()


router.get('/:user_id', tokenVerification, getThisMonthsExpenses)
router.post('/:user_id', tokenVerification, newExpense)
router.patch('/:user_id', tokenVerification, updateExpense)
router.delete('/:user_id', tokenVerification, deleteExpense)

module.exports = router