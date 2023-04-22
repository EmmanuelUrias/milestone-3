import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../models/user'
const {User} = db
console.log(db)

// Register
export const register = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            budget
            } = req.body

        const salt = await bcrypt.genSalt()
        const passWordHash = await bcrypt.hash(password, salt)

        const savedRegisteredUser = await User.create({
            username,
            password: passWordHash,
            email,
            budget,
            time_stamp: new Date
        })
        
        res.status(200).json({
            message: 'New User successfully registered',
            data: savedRegisteredUser
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}

//Login
export const login = async (req, res) => {
    try {
        const { password, email } = req.body
        const isUser = await User.findOne({
            where: { email: email }
        })
        if (!isUser) return res.status(400).send('User does not exist')

        const isMatch = await bcrypt.compare(password, isUser.password)
        if (!isMatch) return res.status(400).send('password is incorrect')

        const jwtToken = jwt.sign({ user_id: isUser.user_id }, process.env.JWT_SECRET)
        delete User.password

        res.status(200).json({ jwtToken, isUser })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}