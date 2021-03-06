const express = require('express');
const router = express.Router();
const Participant = require('../models/participantsModel');

// GET all uparticipants
router.get('/participants/', (req, res) => {
  Participant.find({})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

// POST create participant
router.post('/participants/', (req, res) => {
  const participant = new Participant(req.body);
  participant.save();
  Participant.find({})
    .then((data) =>
      res.json({ data: data, message: 'Participant data saved successfully' })
    )
    .catch((err) => res.json(err));
});

// PUT update participant by id
router.put('/participants/:id', (req, res) => {
  const participantId = req.params.id;
  const updatedParticipant = req.body;
  Participant.findOneAndUpdate({ _id: participantId }, updatedParticipant)
    .then(() =>
      Participant.find({}).then((data) =>
        res.json({ data: data, message: 'Participant data was updated' })
      )
    )
    .catch((err) => res.json(err));
});

// DELETE participant by id
router.delete('/participants/:id', (req, res) => {
  const participantId = req.params.id;
  Participant.findByIdAndDelete({ _id: participantId })
    .then(() => {
      Participant.find({}).then((data) =>
        res.json({ data: data, message: 'Participant data was deleted' })
      );
    })
    .catch((err) => res.json(err));
});

module.exports = router;
