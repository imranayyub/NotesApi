/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // dcreate: function (req, res) {
  //   User.create(req.body).exec(function (err, user) {
  //     if (err) {
  //       return res.json(err.status, {err: err});
  //     }
  //     // If user created successfuly we return user and token as response
  //     if (user) {
  //       // NOTE: payload is { id: user.id}
  //       res.json(200, {user: user, token: jwToken.issue({id: user.id})});
  //     }
  //   });
  // },

  signupOrLogin: function (req, res) {

    User.signupOrLogin(req, res);
  },
  UpdateFcmToken: function(req,res){
    User.UpdateFcmToken;
  }
};
