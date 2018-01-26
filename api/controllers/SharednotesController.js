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
  }
};

