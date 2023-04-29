const db = require('../models')
const { User } = db

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

// Patch
const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params
        const { user_name, password, email, budget } = req.body
    
        const updatedUser = await User.update({
            user_name: user_name,
            password: password,
            email: email,
            budget: budget
        }, {
            where: {
                user_id: user_id
            }
        })
    
        res.status(200).json({
            message: 'User has been updated',
            data: updatedUser
        })
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