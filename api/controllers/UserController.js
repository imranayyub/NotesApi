/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  dcreate: function (req, res) {
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
  },
  //delete: function (req, res, next) {
  //  var email=req.body.email;
  //
  //  User.findOne({email : email},function (err,result) {
  //    if (err) {
  //      console.log(err);
  //      return res.status(500).send();
  //    }
  //
  //    else {
  //      User.update({email: email},{email : email}, function (err, result) {
  //        if (err) {
  //          res.json(err);
  //        }
  //        else {
  //          res.json(result);
  //        }
  //      });
  //    }
  //  });
  //}
//}
//  create: function (req, res) {
//    var email = req.body.email;
//
//    User.findOrCreate({email: email}, function (email, response) {
//      User.create(email).exec(function (err, user) {
//        if (err) {
//          return response.status.send();
//        }
//        // If user created successfuly we return user and token as response
//        if (user) {
//          // NOTE: payload is { id: user.id}
//          response.statusCode.send();
//
//        }
//      });
//    }, function (err, result) {
//      if (err) {
//        console.log(err);
//        return res.status(500).send();
//        //this.dcreate(email,res);
//        //User.create(req.body).exec(function (err, user) {
//        //  if (err) {
//        //    return res.json(err.status, {err: err});
//        //  }
//        //  // If user created successfuly we return user and token as response
//        //  if (user) {
//        //    // NOTE: payload is { id: user.id}
//        //    res.json(200, {user: user, token: jwToken.issue({id: user.id})});
//        //  }
//        //});
//      }
//
//      else {
//        User.update({email: email}, {email: email}, function (err, result) {
//          if (err) {
//            res.json(err);
//          }
//          else {
//            res.json(result);
//          }
//        });
//      }
//    });
//  }

  delete: function (req, res) {
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
  }
};
