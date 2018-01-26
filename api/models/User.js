
module.exports = {
schema : true,
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    token :{
      type: 'String',
      unique:'true'
    }
  },
  signupOrLogin: function (req, res) {
    var email = req.body.email;
    User.findOne({email: email}, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();

      }
      else if(result){
        User.update({email: email}, {token: jwToken.issue({id: result.id})}, function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(result);
          }
        });

      }
      else
      {
        User.create(req.body).exec(function (err, user) {
          if (err) {
            return res.json(err.status, {err: err});
          }
          // If user created successfuly we return user and token as response
          if (user) {
            // NOTE: payload is { id: user.id}
            res.json(200, {user: user, token: jwToken.issue({id: user.id})});
          }
        });
      }
    });
  },


};
