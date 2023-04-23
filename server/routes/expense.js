const express = require('express')
const { getExpenses, newExpense, updateExpense, deleteExpense } = require('../controllers/expense')

const router = express.Router()

router.get('/:user_id', getExpenses)
router.post('/:user_id', newExpense)
router.patch('/:user_id', updateExpense)
router.delete('/:user_id', deleteExpense)

module.exports = router