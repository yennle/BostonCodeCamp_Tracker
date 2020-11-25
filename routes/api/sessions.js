const express = require('express');
const router = express.Router();
const stringCapitalizeName = require('string-capitalize-name');


const Session = require('../../models/Session');

// READ (ONE)
router.get('/:id', (req, res) => {
    Session.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such session.` });
      });
  });
  
  // READ (ALL)
  router.get('/', (req, res) => {
    Session.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });
  
  // CREATE
  router.post('/', (req, res) => {
  
  
    let newSession = new Session({
      name: sanitizeName(req.body.name),
      timeslot: req.body.timeslot,
      speaker: req.body.speaker,
      room: req.body.room
    });
  
    newSession.save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            name: result.name,
            timeslot: result.timeslot,
            speaker: result.speaker,
            room: result.room
          }
        });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.name) {
            res.status(400).json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.timeslot) {
            res.status(400).json({ success: false, msg: err.errors.timeslot.message });
            return;
          }
          if (err.errors.speaker) {
            res.status(400).json({ success: false, msg: err.errors.speaker.message });
            return;
          }
          if (err.errors.room) {
            res.status(400).json({ success: false, msg: err.errors.room.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // UPDATE
  router.put('/:id', (req, res) => {
  
    let updatedSession = {
      name: sanitizeName(req.body.name),
      timeslot: req.body.timeslot,
      speaker: req.body.speaker,
      room: req.body.room
    };
  
    Session.findOneAndUpdate({ _id: req.params.id }, updatedSession, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Session.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                name: newResult.name,
                timeslot: newResult.timeslot,
                speaker: newResult.speaker,
                room: newResult.room
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
          if (err.errors.timeslot) {
            res.status(400).json({ success: false, msg: err.errors.timeslot.message });
            return;
          }
          if (err.errors.speaker) {
            res.status(400).json({ success: false, msg: err.errors.speaker.message });
            return;
          }
          if (err.errors.room) {
            res.status(400).json({ success: false, msg: err.errors.room.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
  
    Session.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          success: true,
          msg: `It has been deleted.`,
          result: {
            _id: result._id,
            name: result.name,
            timeslot: result.timeslot,
            speaker: result.speaker,
            room: result.room
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
