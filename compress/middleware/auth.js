const jwt = require('jsonwebtoken')

const tokenVerification = async (req, res, next) => {
    try {
        let token = req.header('Authorization')

        if(!token) {
            return res.status(404).send('Access not granted')
        }

        if (token.startsWith('The chosen one ')) {
            token = token.slice(14, token.length).trimStart()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err){
        res.status(500).send('Internal Server Error')
    }
}

module.exports = { tokenVerification }