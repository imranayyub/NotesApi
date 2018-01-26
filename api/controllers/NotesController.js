/**
 * NotesController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    Notes.add(req, res);
  },
  getNotes: function (req, res) {

    Notes.getNotes(req, res);
  },
  getEditNote: function (req, res) {
    Notes.getEditNote(req, res);
  },

  editNote: function (req, res) {
    Notes.editNote(req, res);
  },
  deleteNote: function (req, res) {
    Notes.deleteNote(req,res);
  },



};

