const Trip = require('../models/trip');
const User = require('../models/user');

function tripsIndex (req, res, next) {
  Trip
  .find()
  .then((trips) => res.render('trips/index', {trips}))
  .catch(next);
}

function tripsNew (req, res) {
  res.render('trips/new');
}

function tripsCreate(req, res, next) {
  Trip
  .create(req.body)
  .then(trip => {
    User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      user.trip.push(trip._id);
      user.save();
      res.redirect(`/users/${user._id}`);
    });
  })
  .catch(next);
}

function tripsShow(req, res, next) {
  Trip
  .findById(req.params.id)
  .populate('destinations createdBy')
  .exec()
  .then((trip) => {
    if (!trip) return res.status(404);
    res.render('trips/show', {trip});
  })
  .catch(next);
}

function tripsEdit(req, res, next) {
  Trip
  .findById(req.params.id)
  .then((trip) => {
    if (!trip) return res.status(404);
    res.render('trips/edit', {trip});
  })
  .catch(next);
}

function tripsUpdate(req, res, next) {
  Trip
  .findById(req.params.id)
  .then((trip) => {
    if (!trip) return res.status(404);

    for(const field in req.body) {
      trip[field] = req.body[field];
    }
    return trip.save();
  })
  .then((trip) => res.redirect(`/trips/${trip.id}`))
  .catch(next);
}

function tripsDelete(req, res, next) {
  Trip
  .findById(req.params.id)
  .then((trip) => {
    if (!trip) res.status(404);
    return trip.remove();
  })
  .then(() => res.redirect(`/users/${res.locals.user.id}`))
  .catch(next);
}


module.exports = {
  index: tripsIndex,
  new: tripsNew,
  create: tripsCreate,
  show: tripsShow,
  edit: tripsEdit,
  update: tripsUpdate,
  delete: tripsDelete
};
