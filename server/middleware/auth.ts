import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'

interface User {
    user_name: string,
    password: string,
    email: string,
    budget: number,
    time_stamp: string
}

interface AuthRequest extends Request {
    user: User | string | JwtPayload
}

const tokenVerification = async (req: AuthRequest, res: Response) => {
    try {
        let token = req.header('Authorization')

        if(!token) {
            return res.status(404).send('Access not granted')
        }

        if (token.startsWith('The chosen one ')) {
            token = token.slice(14, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET as Secret)
        req.user = verified
    } catch (err){
        res.status(500).send('Internal Server Error')
    }
}