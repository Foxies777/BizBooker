const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserBusinesses } = require('../controllers/usersController')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id/businesses', getUserBusinesses)

module.exports = router
