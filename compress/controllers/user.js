const db = require('../models')
const { User } = db

let year
let month
let day
let hour

// Get
const getUser = async (req, res) => {
    try {
        const { user_id } = req.params
        const foundUser = await User.findOne({ where: { user_id: user_id }})
        console.log(foundUser)
        res.status(200).json(foundUser)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

// Put
const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params
        const { user_name, budget } = req.body
    
        const [numRowsUpdated, [updatedUser]] = await User.update({
            user_name: user_name,
            budget: budget
        }, {
            where: {
                user_id: user_id
            },
            returning: true
        })
    
        res.status(200).json({updatedUser})
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params
    
        const deletedUser = await User.destroy({
            where: {
                user_id: user_id,
            }
        })
    
        res.status(200).json({
            message: 'User has been terminated',
            data: deletedUser
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

module.exports = { getUser, updateUser, deleteUser }