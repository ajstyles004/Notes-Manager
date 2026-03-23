const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, date, color } = req.body;
    const newEvent = new Event({ title, date, color, userId: req.user.id });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
