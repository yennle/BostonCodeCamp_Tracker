const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const stringCapitalizeName = require('string-capitalize-name');
const phoneFormatter = require('phone-formatter');


const Speaker = require('../../models/Speaker');

// READ (ONE)
router.get('/:id', (req, res) => {
    Speaker.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such speaker.` });
      });
  });
  
  // READ (ALL)
  router.get('/', (req, res) => {
    Speaker.find({})
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      });
  });
  
  // CREATE
  router.post('/', (req, res) => {
  
  
    let newSpeaker = new Speaker({
      name: sanitizeName(req.body.name),
      email: sanitizeEmail(req.body.email),
      phone: sanitizePhone(req.body.phone),
      dayphone: sanitizePhone(req.body.dayphone)
    });
  
    newSpeaker.save()
      .then((result) => {
        res.json({
          success: true,
          msg: `Successfully added!`,
          result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            dayphone: result.dayphone
          }
        });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.name) {
            res.status(400).json({ success: false, msg: err.errors.name.message });
            return;
          }
          if (err.errors.email) {
            res.status(400).json({ success: false, msg: err.errors.email.message });
            return;
          }
          if (err.errors.phone) {
            res.status(400).json({ success: false, msg: err.errors.phone.message });
            return;
          }
          if (err.errors.dayphone) {
            res.status(400).json({ success: false, msg: err.errors.dayphone.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // UPDATE
  router.put('/:id', (req, res) => {
  
    let updatedSpeaker = {
      name: sanitizeName(req.body.name),
      email: sanitizeEmail(req.body.email),
      phone: sanitizePhone(req.body.phone),
      dayphone: sanitizePhone(req.body.dayphone)
    };
  
    Speaker.findOneAndUpdate({ _id: req.params.id }, updatedSpeaker, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Speaker.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                name: newResult.name,
                email: newResult.email,
                phone: newResult.phone,
                dayphone: newResult.dayphone
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
          if (err.errors.email) {
            res.status(400).json({ success: false, msg: err.errors.email.message });
            return;
          }
          if (err.errors.phone) {
            res.status(400).json({ success: false, msg: err.errors.phone.message });
            return;
          }
          if (err.errors.dayphone) {
            res.status(400).json({ success: false, msg: err.errors.dayphone.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
  
  // DELETE
  router.delete('/:id', (req, res) => {
  
    Speaker.findByIdAndRemove(req.params.id)
      .then((result) => {
        res.json({
          success: true,
          msg: `It has been deleted.`,
          result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            dayphone: result.dayphone
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
  sanitizeEmail = (email) => {
    return email.toLowerCase();
  }
sanitizePhone = (phone) => {
if (isNaN(phone) && phone != '') return 'N/A';
return phoneFormatter.format(phone, "(NNN) NNN-NNNN");
}
