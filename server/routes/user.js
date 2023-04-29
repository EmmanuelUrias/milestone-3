const express = require('express')
const { getUser, updateUser, deleteUser } = require('../controllers/user')
const { tokenVerification } = require('../middleware/auth')

const router = express.Router()

router.get('/:user_id', getUser)
router.put('/:user_id', updateUser)
router.delete('/:user_id', tokenVerification, deleteUser)

module.exports = router