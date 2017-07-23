const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

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
  .create([{
    name: 'Europe 2017',
    startDate: '10 Jan 2017'
  }])
  .then((trips) => {
    console.log(`${trips.length} trips created`);


    return Destination
    .create([{
      name: 'Eiffel Tower',
      city: 'Paris',
      country: 'France',
      rating: '5',
      notes: 'this is Paris'
    }]);
  });
})
.then((destinations) => {
  console.log(`${destinations.length} destinations created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});
