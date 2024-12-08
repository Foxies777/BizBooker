const express = require('express')
const { register, login, check } = require('../controllers/authController')
const router = express.Router()

router.post('/registration', register)
router.post('/login', login)
router.get('/check', check)

module.exports = router
