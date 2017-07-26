const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true},
  image: { type: String},
  city: { type: String},
  country: { type: String},
  rating: { type: String},
  notes: { type: String},
  trip: {type: mongoose.Schema.ObjectId, ref: 'Trip'}
});

module.exports = mongoose.model('Destination', destinationSchema);
