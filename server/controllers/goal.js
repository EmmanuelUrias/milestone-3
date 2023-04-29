const db = require('../models')
const { Goal } = db
const { Op } = require('sequelize')

// Get 
const findGoals = async (req, res) => {
    try {
        const { user_id } = req.params
        const goals = await Goal.findAll({ where: {user_id: user_id}})

        res.status(200).json(goals)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}


const findGoal = async (req, res) => {
    try {
        const { user_id } = req.params
        const goal = await Goal.findOne({ where: { user_id: user_id }})

        res.status(200).json(goal)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

// Post
const newGoal = async (req, res) => {
    try {
        const { user_id } = req.params
        const { goal_amount } = req.body

        const todaysDate = new Date()
        const thisMonth = new Date(todaysDate.setMonth(todaysDate.getMonth() - 1))
        const currentGoal = await Goal.findOne({
            where: {
                user_id,
                time_stamp: { [Op.gte]: thisMonth }
            }
        })
        if (currentGoal) {
            return res.status(400).json({ message: 'A goal was already created within this month' })
        }

        await Goal.create({
            goal_amount: goal_amount,
            user_id: user_id,
            time_stamp: new Date
        })

        const goal = await Goal.findOne({
            where: {
                user_id: user_id,
                time_stamp: { [Op.gte]: aMonthAgo }
            }
        })

        res.status(200).json({
            message: 'new goal created',
            data: goal
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

// Patch
const updateGoal = async (req, res) => {
    try {
        const { user_id } = req.params
        const { goal_amount } = req.body

        const todaysDate = new Date()
        const thisMonth = new Date(todaysDate.setMonth(todaysDate.getMonth() - 1))
    
        const updatedGoal = await Goal.update({
            goal_amount: goal_amount,
            time_stamp: new Date,
            createdAt: new Date
        }, { where: { 
            user_id: user_id,
            time_stamp: { [Op.gte]: thisMonth }
        }}
        )
    
        res.status(200).json({
            message: 'new goal created',
            data: updatedGoal
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

// Delete
const deleteGoal = async (req, res) => {
    try {
        const { user_id } = req.params

        const todaysDate = new Date()
        const thisMonth = new Date(todaysDate.setMonth(todaysDate.getMonth() - 1))

        const deletedGoal = await Goal.destroy({ 
            where: { 
                user_id: user_id,
                time_stamp: {[Op.gte]: thisMonth}
             }}
            )
    
        res.status(200).json({
            message: 'goal was terminated',
            data: deletedGoal
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    } 
}


module.exports = { findGoals, findGoal, newGoal, updateGoal, deleteGoal}