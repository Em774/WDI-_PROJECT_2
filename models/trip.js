const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: String},
  destinations: [{type: mongoose.Schema.ObjectId, ref: 'Destination'}]
});


module.exports = mongoose.model('Trip', tripSchema);
