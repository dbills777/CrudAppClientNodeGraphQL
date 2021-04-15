import { Character } from '../models/characters.js';
import axios from 'axios';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// seed mongo with characters from breaking bad api
const seedMongo = async () => {
  await mongoose.connect(`${process.env.DGM4790_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const options = {
    method: 'GET',
    url: 'https://www.breakingbadapi.com/api/characters',
  };

  try {
    const response = await axios.request(options);
    console.log('line 20 response log', response.data[1]);
    await postAddCharacter(response.data[0]);
    // await addAllCharacters(response.data[1]);

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

const postAddCharacter = async (oneChar) => {
  console.log('This is the request', oneChar);
  const character = new Character({
    char_id: oneChar.char_id,
    name: oneChar.name,
    birhtday: oneChar.birhtday,
    occupation: oneChar.occupation,
    image: oneChar.img,
    status: oneChar.status,
    nickname: oneChar.nickname,
    portrayed: oneChar.portrayed,
    category: oneChar.category,
  });
  console.log('line 34console.', character);
  await character.save();
};

const addAllCharacters = async (characterList) => {
  for (let character of characterList) {
    // console.log(character)
    await postAddCharacter(character);
  }
};
seedMongo();
