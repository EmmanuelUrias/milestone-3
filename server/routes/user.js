const express = require('express')
const { getUser, updateUser, deleteUser } = require('../controllers/user')

const router = express.Router()

router.get('/:user_id', getUser)
router.patch('/:user_id', updateUser)
router.delete('/:user_id', deleteUser)

module.exports = router