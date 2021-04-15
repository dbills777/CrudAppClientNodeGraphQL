import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CharacterContext = createContext({
  characters: [],
});

export const CharacterContextProvider = (props) => {
  const [characters, setCharacters] = useState([]);

  // const url = 'https://www.breakingbadapi.com/api/characters';
  const url = 'https://immense-island-84831.herokuapp.com/character';
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setCharacters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCharacters();
  }, []);

  return <CharacterContext.Provider value={{ characters }}>{props.children}</CharacterContext.Provider>;
};

export const useCharacterContext = () => useContext(CharacterContext);
