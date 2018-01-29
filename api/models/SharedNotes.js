/**
 * SharedNotes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var FCM = require('fcm-node');

var serverKey = 'AAAAJCiJN_k:APA91bF3uj9lcK5KLi8zPPuuIz0W11oNxEC6o2unfrY--C3woyejz2ssEsBYlFPBIQMlTuIsZresO5xlSeqKL1GjXnw5MOeIg0iFN5iwjAoIRZqQJaO0KKdMreagUrpUXzBHcb3FHErz';
var fcm = new FCM(serverKey);
module.exports = {
  schema: true,
  attributes: {
    sender_email: {
      type: 'email',
      required: true
    },
    reciever_email: {
      type: 'email',
      required: true
    },
    note: {
      type: 'String',
      required: true
    },
    title: {
      type: 'String'
    },
    color: {
      type: 'String'
    },
    tag: {
      type: 'String'
    },
    fcm_token: {
      type: 'String'
    }
  },
  shareNote: function (req, res) {
    User.findOne({email: req.body.reciever_email}, function (err, email) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (email) {
        SharedNotes.create(req.body).exec(function (err, sharednotes) {
          if (err) {
            return res.json(err.status, {err: err});
          }
          // If user created successfuly we return user and token as response
          if (sharednotes) {
            // NOTE: payload is { id: user.id}
            res.json(200, {SharedNotes: sharednotes});
            //this.FirebaseNotification(req,res);
            var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
              to: req.body.fcm_token,

              notification: {
                title: 'Title of your push notification',
                body: 'Body of your push notification'
              },

              //data: {  //you can send only notification or only data(or include both)
              //  my_key: 'my value',
              //  my_another_key: 'my another value'
              //}
            };

            fcm.send(message, function (err, response) {
              if (err) {
                console.log("Something has gone wrong!");
              } else {
                console.log("Successfully sent with response: ", response);
              }
            });
          }
        });
      }

      else {
        res.json(200, 'email not found');
      }
    });
  },
  SharedNotes: function (req, res) {
    SharedNotes.find({reciever_email: req.body.reciever_email}, function (err, sharednote) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200, sharednote);
      }
    });
  },
  FirebaseNotification: function (req, res) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: req.body.fcm_token,
      collapse_key: 'your_collapse_key',

      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
      },

      //data: {  //you can send only notification or only data(or include both)
      //  my_key: 'my value',
      //  my_another_key: 'my another value'
      //}
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });

  },

  getEditSharedNote: function (req, res) {
    SharedNotes.findOne({$and :[{reciever_email:req.body.reciever_email},{note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200,note);
      }
    });
  },
  editSharedNote: function (req, res) {
    editnote = req.body.note;
    SharedNotes.findOne({id: req.body.id}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        SharedNotes.update({id: req.body.id}, {
          note: editnote,
          title: req.body.title,
          tag: req.body.tag,
          color: req.body.color
        }, function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(note);
          }
        });
      }
      else {
        res.json(200, {notes: note});
      }


    });
  },
  deleteSharedNote: function (req, res) {
    SharedNotes.findOne({$and: [{reciever_email: req.body.reciever_email}, {note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        SharedNotes.destroy({id: note.id}).exec(function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json({delete: 'note deleted'});
          }

        });
      }

      else {
        res.json(200, {not_found: 'note not found'});
      }
    });
  },


};
