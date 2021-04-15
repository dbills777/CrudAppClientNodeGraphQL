import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  char_id: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  birhtday: {
    type: String,
    required: false,
  },
  appearance: {
    type: Array,
    required: false,
  },
  better_call_saul_appearance: {
    type: Array,
    required: false,
  },
  occupation: {
    type: Array,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  portrayed: {
    type: String,
    required: false,
  },

  status: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },

  portrayed: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});
export const Character = mongoose.model('Character', characterSchema);
