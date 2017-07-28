const User = require('../models/user');
const Trip = require('../models/trip');


function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('trip')
    .exec()
    .then((user) => {
      Trip
        .find({createdBy: user._id})
        .exec()
        .then(trips => {
          res.render('users/show', {user, trips});
        });
    });
}

module.exports = {
  show: usersShow
};
