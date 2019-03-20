const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Register
let register = new Schema({

  email: {
    type: String
  },
  password: {
    type: String
  },
  mobile:{
    type:Number
  }
  
},
{
  collection: 'employee'
});

const regi=module.exports = mongoose.model('register',register);