const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');


const nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [0, 40],
      message: 'Name must not exceed {ARGS[1]} characters.'
    })
  ];
  
  const emailValidator = [
    validate({
      validator: 'isLength',
      arguments: [0, 40],
      message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
      validator: 'isEmail',
      message: 'Email must be valid.'
    })
  ];
  
  const phoneValidator = [
    // TODO: Make some validations here...
  ];
  
  const dayphoneValidator = [
    // TODO: Make some validations here...
  ];

const SpeakerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true
    },
    dayphone:{
        type:String
    }
});

// Use the unique validator plugin
SpeakerSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = Speaker = mongoose.model('speaker',SpeakerSchema);