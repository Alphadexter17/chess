const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// Insert array of 5 songs
router.post('/insertMany', async (req, res) => {
  await Song.insertMany(req.body);
  res.json({ success: true });
});

// d) Count and list all songs
router.get('/all', async (req, res) => {
  const count = await Song.countDocuments();
  const songs = await Song.find();
  res.json({ count, songs });
});

// e) List specified Music Director's songs
router.get('/by-director/:director', async (req, res) => {
  const songs = await Song.find({ Music_director: req.params.director });
  res.json(songs);
});

// f) List specified Music Director's songs sung by specified Singer
router.get('/by-director-singer', async (req, res) => {
  const { director, singer } = req.query;
  const songs = await Song.find({ Music_director: director, Singer: singer });
  res.json(songs);
});

// g) Delete song by name
router.delete('/delete/:songname', async (req, res) => {
  const result = await Song.deleteOne({ Songname: req.params.songname });
  res.json({ success: result.deletedCount > 0 });
});

// h) Add new song (favorite)
router.post('/add', async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
});

// i) List songs sung by specified singer from specified film
router.get('/by-singer-film', async (req, res) => {
  const { singer, film } = req.query;
  const songs = await Song.find({ Singer: singer, Film: film });
  res.json(songs);
});

// j) Update document by adding Actor and Actress name (by Songname)
router.put('/add-actor-actress/:songname', async (req, res) => {
  const { Actor, Actress } = req.body;
  const updated = await Song.findOneAndUpdate(
    { Songname: req.params.songname },
    { Actor, Actress },
    { new: true }
  );
  res.json(updated);
});

// k) List all songs (for table)
router.get('/table', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

module.exports = router;
