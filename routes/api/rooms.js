const express = require('express');
const router = express.Router();
const stringCapitalizeName = require('string-capitalize-name');


const Room = require('../../models/Room');

// READ (ONE)
router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such room.` });
      });
  });
  
  // READ (ALL)
  router.get('/', (req, res) => {
    Room.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });
  
  // CREATE
  router.post('/', (req, res) => {
  
    let newRoom = new Room({
      name: sanitizeName(req.body.name),
      capacity: req.body.capacity
    });
  
    newRoom.save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            name: result.name,
            capacity: result.capacity,
          }
        });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.name) {
            res.status(400).json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.capacity) {
            res.status(400).json({ success: false, msg: err.errors.capacity.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // UPDATE
  router.put('/:id', (req, res) => {
  
    let updatedRoom = {
      name: sanitizeName(req.body.name),
      capacity: req.body.capacity,
    };
  
    Room.findOneAndUpdate({ _id: req.params.id }, updatedRoom, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Room.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                name: newResult.name,
                capacity: newResult.capacity,
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            return;
          });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.name) {
            res.status(400).json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.capacity) {
            res.status(400).json({ success: false, msg: err.errors.capacity.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
  
    Room.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          success: true,
          msg: `It has been deleted.`,
          result: {
            _id: result._id,
            name: result.name,
            capacity: result.capacity,
          }
        });
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: 'Nothing to delete.' });
      });
  });
  
  module.exports = router;
  
  // Minor sanitizing to be invoked before reaching the database
  sanitizeName = (name) => {
    return stringCapitalizeName(name);
  }
