const db = require('../models')
const { User, Expense } = db
const { Op } = require('sequelize')

// Get
const getExpenses = async (req, res) => {
    const { user_id } = req.params

    const expenses = await Expense.findAll({ where: { user_id: user_id }})

    res.status(200).json(expenses)
}

// Post
const newExpense = async (req, res) => {
    const { user_id } = req.params
    const { expense_name, expense_amount, expense_type } = req.body

    const createNewExpense = await Expense.create({
        expense_name: expense_name,
        expense_amount: expense_amount,
        expense_type: expense_type,
        user_id: user_id,
        time_stamp: new Date
    })

    res.status(200).json({
        message: 'new expense has been created',
        data: createNewExpense
    })
}

// Patch
const updateExpense = async (req, res) => {

}

// Delete
const deleteExpense = async (req, res) => {

}

module.exports = { getExpenses, newExpense, updateExpense, deleteExpense }