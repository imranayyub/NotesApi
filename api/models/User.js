
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
  }

};
