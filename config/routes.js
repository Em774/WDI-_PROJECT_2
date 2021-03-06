const express       = require('express');
const router        = express.Router();

const statics       = require('../controllers/statics');
const trips         = require('../controllers/trips');
const destinations  = require('../controllers/destinations');
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');
const users         = require('../controllers/users');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      res.redirect('/login');
    });
  }
  return next();
}


router.route('/')
  .get(statics.homepage);

router.route('/trips')
  .get(trips.index)
  .post(trips.create);

router.route('/trips/new')
    .get(secureRoute, trips.new);

router.route('/trips/:id')
  .get(trips.show)
  .put(trips.update)
  .post(destinations.create)
  .delete(trips.delete);

router.route('/trips/:id/edit')
  .get(trips.edit);

router.route('/trips/:id/destinations/new')
  .get(destinations.new);

router.route('/trips/:tripId/destinations/:destinationId')
  .get(destinations.show)
  .put(destinations.update)
  .delete(destinations.delete);

router.route('/trips/:tripId/destinations/:destinationId/edit')
  .get(destinations.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.show);

module.exports = router;
