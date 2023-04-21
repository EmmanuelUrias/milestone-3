import jwt from 'jsonwebtoken'

const tokenVerification = async (req, res) => {
    try {
        let token = req.header('Authorization')

        if(!token) {
            return res.status(404).send('Access not granted')
        }

        if (token.startswith('The chosen one ')) {
            token = token.slice(14, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
    } catch (err){
        res.status(500).send('Internal Server Error')
    }
}