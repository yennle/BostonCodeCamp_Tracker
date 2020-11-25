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

const TimeslotSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    end:{
        type: String,
        required: true,
    },
    start:{
        type:String,
        required:true
    }
});

// Use the unique validator plugin
TimeslotSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = Timeslot = mongoose.model('timeslot',TimeslotSchema);