/**
 * SharedNotes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema : true,
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
          }
        });
      }

      else {
        res.json(200, 'email not found');
      }
    });
  },
  SharedNotes:function (req, res) {
    SharedNotes.find({reciever_email: req.body.reciever_email}, function (err, sharednote) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200, {notes: sharednote});
      }
    });
  }

};
