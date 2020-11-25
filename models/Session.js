const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');


const nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [0, 100],
      message: 'Name must not exceed {ARGS[1]} characters.'
    })
  ];
const SessionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    timeslot:{
        type: String,
        required: true,
    },
    speaker:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required: true
    }
});

// Use the unique validator plugin
SessionSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = Session = mongoose.model('session',SessionSchema);