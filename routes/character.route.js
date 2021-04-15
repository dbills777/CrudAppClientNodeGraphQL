//imports
import { Router } from 'express';

import {
  postAddCharacter,
  getAllCharcters,
  updateName,
  updateNickName,
  seachCharacters,
  deleteCharactersByID,
} from '../controllers/character.controller.js';

//export appRouter instances
export const characterRouter = Router();
// Post character
characterRouter.post('/', postAddCharacter);
// Get characters search and all
characterRouter.get('/', getAllCharcters);
characterRouter.get('/search', seachCharacters);
// Delete one character
characterRouter.delete('/', deleteCharactersByID);
// Update characters
characterRouter.put('/update-name', updateName);
characterRouter.put('/update-nick-name', updateNickName);
