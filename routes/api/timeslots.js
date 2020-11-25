const express = require('express');
const router = express.Router();
const stringCapitalizeName = require('string-capitalize-name');


const Timeslot = require('../../models/Timeslot');

// READ (ONE)
router.get('/:id', (req, res) => {
    Timeslot.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such time slot.` });
      });
  });
  
  // READ (ALL)
  router.get('/', (req, res) => {
    Timeslot.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });
  
  // CREATE
  router.post('/', (req, res) => {
  
  
    let newTimeslot = new Timeslot({
      name: sanitizeName(req.body.name),
      end: req.body.end,
      start: req.body.start
    });
  
    newTimeslot.save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            name: result.name,
            end: result.end,
            start: result.start
          }
        });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.name) {
            res.status(400).json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.end) {
            res.status(400).json({ success: false, msg: err.errors.end.message });
            return;
          }
          if (err.errors.start) {
            res.status(400).json({ success: false, msg: err.errors.start.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // UPDATE
  router.put('/:id', (req, res) => {
  
    let updatedTimeslot = {
      name: sanitizeName(req.body.name),
      end: req.body.end,
      start: req.body.start
    };
  
    Timeslot.findOneAndUpdate({ _id: req.params.id }, updatedTimeslot, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Timeslot.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                name: newResult.name,
                end: newResult.end,
                start: newResult.start
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
          if (err.errors.end) {
            res.status(400).json({ success: false, msg: err.errors.end.message });
            return;
          }
          if (err.errors.start) {
            res.status(400).json({ success: false, msg: err.errors.start.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
  
    Timeslot.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          success: true,
          msg: `It has been deleted.`,
          result: {
            _id: result._id,
            name: result.name,
            end: result.end,
            start: result.start
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
