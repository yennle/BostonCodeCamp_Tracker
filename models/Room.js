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
  

const RoomSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    capacity:{
        type: Number,
        required: true,
    }
});

// Use the unique validator plugin
RoomSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = Room = mongoose.model('room',RoomSchema);