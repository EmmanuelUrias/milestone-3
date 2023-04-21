import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
const db = require('../models/user')
import { Request, Response } from 'express'
const { User } = db


// Register
export const register = async (req: Request, res: Response) => {
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

    } catch(err: any) {
        res.status(500).json({ error: err.message })
    }
}

//Login
export const login = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body
        const isUser = await User.findOne({
            where: { email: email }
        })
        if (!isUser) return res.status(400).send('User does not exist')

        const isMatch = await bcrypt.compare(password, isUser.password)
        if (!isMatch) return res.status(400).send('password is incorrect')

        const jwtToken = jwt.sign({ user_id: isUser.user_id }, process.env.JWT_SECRET as Secret)
        delete User.password

        res.status(200).json({ jwtToken, isUser })
    } catch(err: any) {
        res.status(500).json({ error: err.message })
    }
}