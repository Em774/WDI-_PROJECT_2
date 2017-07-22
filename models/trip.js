const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {type: String, required: true},
  startDate: {type: String}
});

module.exports = mongoose.model('Trip', tripSchema);
