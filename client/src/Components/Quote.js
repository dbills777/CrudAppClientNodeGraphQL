import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import './Quote.css';
import { useCharacterContext } from '../contexts/CharacterContext';

export default function Quote() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const [quotes, setQuotes] = useState([]);
  const [quotechange, SetQuotechange] = useState('something');

  const style = {
    color: 'white',
    fontSize: '1.5rem',
    minWidth: '75%',
    maxWidth: '75%',
    position: 'relative',
    padding: '1rem',
    zIndex: '1',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(120, 120, 120, 0.4)',
  };
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/quote/random?author`);
      setQuotes(result.data);
      console.log(result.data);
    };
    fetchItems();
  }, [quotechange]);
  const getNewQuote = () => {
    SetQuotechange(quotes);
    handleChange(setChecked());
  };
  const items = useCharacterContext();

  return quotes.map((item) => {
    const author = item.author;

    const image = items.characters.filter((person) => {
      return person.name === author || person.nickname === author;
    });
    const photo = image.map((person) => person.image);

    return (
      <div className='quoteDiv' key={item.quote_id} style={style}>
        <button className='btn' onClick={getNewQuote}>
          New quote
        </button>
        <br></br>
        <div className='bubble' style={style}>
          <em className='italics'>
            <h3>
              <strong></strong> "{item.quote}"
            </h3>
          </em>
        </div>

        <p className='flex'>
          {image.length ? (
            <>
              <Slide direction='left' in={checked} mountOnEnter unmountOnExit>
                <img alt={photo.id} className='img' src={photo}></img>
              </Slide>
            </>
          ) : null}
          -{item.author}, {item.series}
        </p>
      </div>
    );
  });
}
