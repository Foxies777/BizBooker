const express = require('express')
const { createService, getServicesByBusinessId } = require('../controllers/serviceController')
const router = express.Router()

router.post('/create', createService)
router.get('/:id', getServicesByBusinessId)

module.exports = router