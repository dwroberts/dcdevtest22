const express = require('express')
const router = express.Router()
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController')

// router.get('/', getUsers)
// router.post('/', createUser)
router.route('/').get(getUsers).post(createUser)

// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)
router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router