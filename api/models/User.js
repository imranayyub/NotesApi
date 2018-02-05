module.exports = {
  schema: true,
  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    token: {
      type: 'String',
      required: true
    },
    fcm_token: {
      type: 'String',
      required: true
    },

  },
  signupOrLogin: function (req, res) {
    var email = req.body.email;
    User.findOne({email: email}, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      else if (result) {
        ////sails.log("user already exit - type:", userObj.type);
        //var token = jwt.sign(userObj, sails.config.globals.jwt_secret, {expiresIn: "365d"});
        //User.update({email: email},{fcm_token:req.body.fcm_token,token :jwToken.issue({id: result.id})});
        //res.json({user:user});
        result.token = jwToken.issue({id: result.id});
        res.json(result);
      }
      else {
        User.create(req.body).exec(function (err, user) {
          if (err) {
            return res.json(err.status, {err: err});
          }
          // If user created successfuly we return user and token as response
          if (user) {
            // NOTE: payload is { id: user.id}
            user.token = jwToken.issue({id: user.id});
            res.json(200, {user: user, token: jwToken.issue({id: user.id})});
          }
        });
      }
    });
  },
  UpdateFcmToken: function(req,res){
    var email = req.body.email;
    User.findOne({email: email}, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      else if (result) {
        User.update({email: email},{fcm_token:req.body.fcm_token});
            res.json({user:user});
      }
    });

  },


};
