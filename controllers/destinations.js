const Destination = require('../models/destination');

function destinationsNew (req, res) {
  res.render('destinations/new');
}

function destinationsCreate (req, res, next) {
  Destination
  .create(req.body)
  .then(() => res.redirect('/trips/:id'))
  .catch(next);
}


module.exports = {
  new: destinationsNew,
  create: destinationsCreate
};
