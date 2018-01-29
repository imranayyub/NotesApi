module.exports = {
    schema : true,
      attributes: {
        emails: {
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
  add: function (req, res) {
    Notes.create(req.body).exec(function (err, notes) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (notes) {
        // NOTE: payload is { id: user.id}
        res.json(200, {notes: notes});
      }
    });
  },
  getNotes: function (req, res) {

    Notes.find({emails: req.body.emails}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(note);
      }
    });
  },
  getEditNote: function (req, res) {
    Notes.findOne({$and :[{emails:req.body.emails},{note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200,note);
      }
    });
  },

  editNote: function (req, res) {
    editnote = req.body.note;
    Notes.findOne({id: req.body.id}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        Notes.update({id: req.body.id}, {note: editnote,title :req.body.title,tag:req.body.tag,color:req.body.color}, function (err, result) {
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
  deleteNote: function (req, res) {
    Notes.findOne({$and :[{emails:req.body.emails},{note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        Notes.destroy({id: note.id}).exec(function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json({delete :'note deleted'});
          }

        });
      }

      else {
        res.json(200,{not_found : 'note not found'});
      }
    });
  },

};
