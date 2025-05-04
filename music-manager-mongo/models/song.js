const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

module.exports = mongoose.model('Song', SongSchema, 'songdetails');
