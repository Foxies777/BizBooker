const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser, getUserBusinesses, getUserBookings, cancelBooking } = require('../controllers/usersController')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id/businesses', getUserBusinesses)
router.get("/:userId/bookings", getUserBookings);

router.put("/:userId/bookings/:bookingId/cancel", cancelBooking);
module.exports = router
