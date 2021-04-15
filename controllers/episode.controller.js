import { Episode } from '../models/episode.js';

export const postAddEpisodes = async (req, res) => {
  const episode = new Episode({
    episode_id: req.body.episode_id,
    title: req.body.title,
    season: req.body.season,
    air_date: req.body.air_date,
    characters: req.body.characters,
    episode: req.body.episode,
    series: req.body.series,
  });
  console.log(episode);
  product.save();
  res.json(episode);
};
export const getAllEpisodes = async (req, res) => {
  const episodes = await Episode.find();
  res.send(episodes);
};
