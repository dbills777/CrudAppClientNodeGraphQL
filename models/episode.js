import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  episode_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  air_date: {
    type: String,
    required: true,
  },
  characters: {
    type: Array,
    required: true,
  },
  episode: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
});
export const Episode = mongoose.model('Episode', episodeSchema);
