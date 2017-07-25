const mongoose   = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const db = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(db);

const User = require('../models/user');
const Trip = require('../models/trip');
const Destination = require('../models/destination');

User.collection.drop();
Trip.collection.drop();
Destination.collection.drop();

User
.create([{
  username: 'emilie',
  email: 'emilie@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created!`);
  return Trip
  .create({
    name: 'Europe 2017',
    startDate: '10 Jan 2017'
  })
  .then((trip) => {
    console.log(`${trip} was created`);
    return Destination.create({
      name: 'Eiffel Tower',
      city: 'Paris',
      country: 'France',
      rating: '5',
      notes: 'this is Paris',
      trip: trip._id
    })
    .then((destination) => {
      console.log(`${destination} destination was created`);
      trip.destinations.push(destination);
      return trip.save();
    });
  })

  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
});
