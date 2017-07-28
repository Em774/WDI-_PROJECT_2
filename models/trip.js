const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: String, required: true},
  destinations: [{type: mongoose.Schema.ObjectId, ref: 'Destination'}],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Trip', tripSchema);
