const Booking = require("../models/booking");
const { sequalize } = require("../configs/mysqldb");
const { setCache, getCache } = require("../configs/cacheConfig");

const AvailableSeats = {
    A0: true,  B0: true,  C0: true,  D0: true,  E0: true,  F0: true,  G0: true,  H0: true,  I0: true,  J0: true,  K0: true,
    A1: true,  B1: true,  C1: true,  D1: true,  E1: true,  F1: true,  G1: true,  H1: true,  I1: true,  J1: true,  K1: true,
    A2: true,  B2: true,  C2: true,  D2: true,  E2: true,  F2: true,  G2: true,  H2: true,  I2: true,  J2: true,  K2: true,
    A3: true,  B3: true,  C3: true,  D3: true,  E3: true,  F3: true,  G3: true,  H3: true,  I3: true,  J3: true,  K3: true,
    A4: true,  B4: true,  C4: true,  D4: true,  E4: true,  F4: true,  G4: true,  H4: true,  I4: true,  J4: true,  K4: true,
    A5: true,  B5: true,  C5: true,  D5: true,  E5: true,  F5: true,  G5: true,  H5: true,  I5: true,  J5: true,  K5: true,
  };


const getAllBookings = async (req, res) => {
  try {
    let bookings = await Booking.findAll();
    if (bookings.length == 0) {
      return res.status(404).json({ message: "No Result Found." });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const getShowAvailableSeats = async (req, res) => {
  try {
    let { showId } = req.params;

    let cachedData = await getCache(`shows_${showId}_Availability`);
    if (cachedData) {
      return res
        .status(200)
        .json({
          showId,
          availableSeats: cachedData.availableSeats,
          isCachedData: true,
        });
    }

    await sequalize.transaction(async (t) => {
      const bookings = await Booking.findAll({
        where: {
          movieTheatreMappingId: showId,
        },
        attributes: ["id", "seats"],
        lock: t.LOCK.SHARE,
        transaction: t,
      });

      let tempAvailableSeats = { ...AvailableSeats };
      bookings.map((booking) => {
        let seats = booking.seats.split(",");
        seats.forEach((seat) => {
          tempAvailableSeats[seat] = false;
        });
      });
      setCache(`shows_${showId}_Availability`, {
        availableSeats: tempAvailableSeats,
      });
      response.status(200).json({ showId, availableSeats: tempAvailableSeats });
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const saveBooking = async (req, res) => {
  try {
    const { booking } = req.body;
    await sequalize.transaction(async (t) => {
      //getting available seats
      let availabilityCachedData = await getCache(
        `shows_${booking.showId}_Availability`
      );
      let tempAvailability = availabilityCachedData?.availableSeats || {
        ...AvailableSeats,
      };

      //checking if booked seats are available
      let areSeatsAvailable = true;
      booking.seats.split(",").forEach((seat) => {
        if (!tempAvailability[seat]) {
          areSeatsAvailable = false;
        }
      });

      //if not available sending apt response
      if (!areSeatsAvailable) {
        response
          .status(404)
          .json({ message: "Seats are already booked. Please try another!" });
      }
      //if available storing booking data
      const bookingDetails = await Booking.create(booking, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      booking.seats.split(",").forEach((seat) => {
        tempAvailability[seat] = false;
      });

      //updating cache data according to booked seats
      setCache(`shows_${booking.showId}_Availability`, {
        availableSeats: tempAvailability,
      });
      response
        .status(200)
        .json({ message: "Show Booked Successfully", bookingDetails });
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

module.exports = {
  getAllBookings,
  getShowAvailableSeats,
  saveBooking,
};