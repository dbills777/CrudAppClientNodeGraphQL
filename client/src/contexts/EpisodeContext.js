import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EpisodeContext = createContext({
  episodes: [],
});

export const EpisodeContextProvider = (props) => {
  const [episodes, setEpisodes] = useState([]);

  const url = 'https://immense-island-84831.herokuapp.com/episode';
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(url);
        setEpisodes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCharacters();
  }, []);

  return (
    <EpisodeContext.Provider value={{ episodes }}>
      {props.children}
    </EpisodeContext.Provider>
  );
};

export const useEpisodeContext = () => useContext(EpisodeContext);
