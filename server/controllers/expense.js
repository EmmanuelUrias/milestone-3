const db = require('../models')
const { Expense } = db
const { Op } = require('sequelize')

// Get
const getExpenses = async (req, res) => {
    const { user_id } = req.body

    const expenses = await Expense.findAll({ where: { user_id: user_id }})

    res.status(200).json(expenses)
}

const getThisMonthsExpenses = async (req, res) => {
    const { user_id } = req.params

    const todaysDate = new Date()
    const thisMonth = new Date(todaysDate.setMonth(todaysDate.getMonth() - 1))

    const thisMonthsExpenses = await Expense.findAll({
        where: {
            user_id: user_id,
            time_stamp: { [Op.gte]: thisMonth}
        }
    })

    res.status(200).json(thisMonthsExpenses)
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

    const expenses = await Expense.findAll({ where: { user_id: user_id }})


    res.status(200).json({
        message: 'new expense has been created',
        data: createNewExpense
    })
}

// Patch
const updateExpense = async (req, res) => {
    const { user_id } = req.params
    const { expense_id, expense_name, expense_amount, expense_type } = req.body

    const updatedExpense = await Expense.update({
        expense_name: expense_name,
        expense_amount: expense_amount,
        expense_type: expense_type
    }, {
        where: {
            user_id: user_id,
            expense_id: expense_id
        }
    })

    res.status(200).json({
        message: 'expense has been updated',
        data: updatedExpense
    })
}

// Delete
const deleteExpense = async (req, res) => {
    const { user_id, expense_id } = req.params

    const deletedExpense = await Expense.destroy({
        where: {
            user_id: user_id,
            expense_id: expense_id
        }
    })

    res.status(200).json({
        message: 'expense has been terminated',
        data: deletedExpense
    })
}

module.exports = { getExpenses, getThisMonthsExpenses, newExpense, updateExpense, deleteExpense }