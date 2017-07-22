const express = require('express');
const router  = express.Router();

const statics = require('../controllers/statics');
const trips   = require('../controllers/trips');

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
  .delete(trips.delete);

router.route('/trips/:id/edit')
  .get(trips.edit);

module.exports = router;
