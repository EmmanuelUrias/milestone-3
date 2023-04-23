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

// Delete --> Note: maybe should be in auth

module.exports = { getUser }