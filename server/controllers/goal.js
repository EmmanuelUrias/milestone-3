const db = require('../models')
const { User, Goal } = db

// Get 
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
        const { goal_amount, user_id } = req.body
        const user = await User.findOne({ where: { user_id: user_id }})

        const aMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const currentGoal = await Goal.findOne({
            where: {
                user_id: user_id,
                createdAt: { [Op.gte]: aMonthAgo }
            }
        })
        if (currentGoal) {
            return res.status(400).json({ message: 'A goal was already created within the last 30 days' })
        }

        await Goal.create({
            goal_amount,
            user_id: user.user_id,
            time_stamp: new Date,
            createdAt: new Date
        })

        const goal = await Goal.findOne({
            where: {
                user_id: user_id,
                createdAt: { [Op.gte]: aMonthAgo }
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

module.exports = { findGoal, newGoal }