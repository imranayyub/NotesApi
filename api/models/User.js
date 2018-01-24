var jwt  = require('jsonwebtoken');
module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    }
  }

};
