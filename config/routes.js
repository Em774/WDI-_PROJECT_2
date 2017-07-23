const express       = require('express');
const router        = express.Router();

const statics       = require('../controllers/statics');
const trips         = require('../controllers/trips');
const destinations  = require('../controllers/destinations');
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');

router.route('/')
  .get(statics.homepage);

router.route('/trips')
  .get(trips.index)
  .post(trips.create);

router.route('/trips/new')
    .get(trips.new);

router.route('/trips/:id')
  .get(trips.show)
  .put(trips.update)
  .post(destinations.create)
  .delete(trips.delete);

router.route('/trips/:id/edit')
  .get(trips.edit);

router.route('/destinations/new')
  .get(destinations.new);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;
