const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const db = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(db);

const Trip = require('../models/trip');

Trip.collection.drop();

Trip
  .create([{
    name: 'Europe 2017',
    startDate: '10 Jan 2017'
  }])
.then((trips) => {
  console.log(`${trips.length} trips created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
