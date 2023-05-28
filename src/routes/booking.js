const express = require("express");
const Booking = require("../models/booking");
const { sequalize } = require("../configs/mysqldb");
const {
  getAllBookings,
  getShowAvailableSeats,
  saveBooking,
} = require("../controllers/bookings");
const router = express.Router();

router.get("/", getAllBookings);

router.get("/availableSeats/:showId", getShowAvailableSeats);

router.post("/", saveBooking);

module.exports = router;
