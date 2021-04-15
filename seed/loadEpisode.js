import axios from 'axios';
import { Episode } from '../models/episode.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const seedMongo = async () => {
  await mongoose.connect(`${process.env.DGM4790_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const options = {
    method: 'GET',
    url: 'https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad',
  };
  try {
    const response = await axios.request(options);
    console.log(response.data[0]);
    await postAddEpisodes(response.data[0]);
    await addEpisodes(response.data);
    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

const postAddEpisodes = async (oneItem) => {
  console.log('This is the oneItem', oneItem);
  const episode = new Episode({
    episode_id: oneItem.episode_id,
    title: oneItem.title,
    season: oneItem.season,
    air_date: oneItem.air_date,
    characters: oneItem.characters,
    episode: oneItem.episode,
    series: oneItem.series,
  });
  //   console.log(product);
  await episode.save();
  console.log('added one item to the db');
};
const addEpisodes = async (episodeList) => {
  for (let episode of episodeList) {
    await postAddEpisodes(episode);
  }
};
seedMongo();
