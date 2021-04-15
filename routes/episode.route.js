//imports
import { Router } from 'express';
import { postAddEpisodes, getAllEpisodes } from '../controllers/episode.controller.js';

export const episodeRouter = Router();
// Post Episodes (inital DB population)
episodeRouter.post('/', postAddEpisodes);
episodeRouter.get('/', getAllEpisodes);
