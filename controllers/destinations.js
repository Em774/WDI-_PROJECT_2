const Destination = require('../models/destination');
const Trip        = require('../models/trip');

function destinationsNew (req, res) {
  Trip
  .findById(req.params.id)
  .then((trip) => {
    res.render('destinations/new', {trip});
  });
}

function destinationsCreate (req, res, next) {
  Trip
  .findById(req.params.id)
  .then((trip) =>  {
    req.body.trip = trip._id;
    Destination
    .create(req.body)
    .then((destination) => {
      console.log(destination);
      trip.destinations.push(destination._id);
      trip.save();
      console.log(trip);
      res.redirect(`/trips`);
    })
    .catch(next);
  });
}

module.exports = {
  new: destinationsNew,
  create: destinationsCreate
};
