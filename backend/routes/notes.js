const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const { isArchived, isTrashed } = req.query;
    const filter = { userId: req.user.id };
    
    if (isArchived === 'true') filter.isArchived = true;
    else if (isArchived === 'false') filter.isArchived = false;

    if (isTrashed === 'true') filter.isTrashed = true;
    else if (isTrashed === 'false') filter.isTrashed = false;

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, color, isPinned, folderId, tags } = req.body;
    const newNote = new Note({
      title, content, color, isPinned, folderId, tags, userId: req.user.id
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await note.deleteOne();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
