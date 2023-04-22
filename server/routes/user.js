const express = require('express')
const { getUser } = require('../controllers/user')

const router = express.Router()

router.get('/:user_id', getUser)

module.exports = router