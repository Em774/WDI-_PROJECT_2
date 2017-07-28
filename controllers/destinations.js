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
  console.log(req.body);
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
      res.redirect(`/trips/${trip._id}`);
    })
    .catch(next);
  });
}

function destinationsShow (req, res, next) {
  Destination
  .findById(req.params.destinationId)
  .then((destination) => {
    if (!destination) return res.status(404);
    res.render('destinations/show', {destination});
  })
  .catch(next);
}

function destinationsEdit (req, res, next) {
  Destination
  .findById(req.params.destinationId)
  .then((destination) => {
    if (!destination) return res.status(404);
    res.render('destinations/edit', {destination});
  })
  .catch(next);
}

function destinationsUpdate (req, res, next) {
  Destination
  .findById(req.params.destinationId)
  .then((destination) => {
    if (!destination) res.status(404);

    for(const field in req.body) {
      destination[field] = req.body[field];
    }
    return destination.save();
  })
  .then((destination) =>  res.redirect(`/trips/${destination.trip}/destinations/${destination._id}`))
  .catch(next);
}

function destinationsDelete(req, res, next) {
  Destination
  .findById(req.params.destinationId)
  .exec()
  .then((destination) => {
    if (!destination) return res.status(404);
    destination.remove();
    destination.save();
    res.redirect(`/trips/${destination.trip}`);

  })
  .catch(next);
}



module.exports = {
  new: destinationsNew,
  create: destinationsCreate,
  show: destinationsShow,
  edit: destinationsEdit,
  update: destinationsUpdate,
  delete: destinationsDelete
};
