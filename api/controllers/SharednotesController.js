/**
 * SharednotesController
 *
 * @description :: Server-side logic for managing sharednotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  shareNote: function (req, res) {
    SharedNotes.shareNote(req, res);
  },
  SharedNotes:function (req, res) {
    SharedNotes.SharedNotes(req, res);
  },
  FirebaseNotification:function(req,res)
  {
    SharedNotes.FirebaseNotification(req,res);
  },
  deleteSharedNote: function (req, res) {
    SharedNotes.deleteSharedNote(req,res);
  },
  getEditSharedNote: function (req, res) {
    SharedNotes.getEditSharedNote(req,res);
  },
  editSharedNote: function (req, res) {
    SharedNotes.editSharedNote(req,res);
  }

};

