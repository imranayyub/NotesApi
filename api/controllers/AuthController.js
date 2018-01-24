/**
 * AuthControllerController
 *
 * @description :: Server-side logic for managing Authcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    var email = req.param('email');
    Users.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }
      else {
        res.json({
          user: user,
          token: jwToken.issue({id: user.id})
        });
      }
    });
  }
};
