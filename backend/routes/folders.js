const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, color } = req.body;
    const newFolder = new Folder({ name, color, userId: req.user.id });
    const folder = await newFolder.save();
    res.json(folder);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) return res.status(404).json({ msg: 'Folder not found' });
    if (folder.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await folder.deleteOne();
    res.json({ msg: 'Folder removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
