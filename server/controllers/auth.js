import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../models'
const { User } = db


// Register
export const register = async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            budget,
            time_stamp
        } = req.body

        const salt = await bcrypt.genSalt()
        const passWordHash = await bcrypt.hash(password, salt)

        const registeredUser = User.build({
            username,
            password: passWordHash,
            email,
            budget,
            time_stamp: new Date
        })

        const savedRegisteredUser = await User.create(registeredUser)
        
        res.status(200).json({
            message: 'New User successfully registered',
            data: savedRegisteredUser
        })

    } catch(err) {
        res.status(500).send('Internal Server Error')
    }
}