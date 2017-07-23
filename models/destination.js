const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true},
  city: { type: String},
  country: { type: String},
  rating: { type: String},
  notes: { type: String}
});

module.exports = mongoose.model('Destination', destinationSchema);
