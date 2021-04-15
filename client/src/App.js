import './App.css';
import React from 'react';
import MenuAppBar from './Components/MenuAppBar';
import Quotes from './Components/Quote';
import Episodes from './Components/Episodes';
import CardUser from './Components/CardUser';
import LoginFullScreen from './Components/LoginFullScreen';
import { Switch, Route } from 'react-router-dom';
import { CharacterContextProvider } from './contexts/CharacterContext';
import { LoginContextProvider } from './contexts/LoginContext';
import { EpisodeContextProvider } from './contexts/EpisodeContext';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const App = () => {
  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <LoginContextProvider>
        <CharacterContextProvider>
          <EpisodeContextProvider>
            <>
              <MenuAppBar />
              <div className='image'></div>
              <div className='container'>
                <Switch>
                  <Route path='/quotes' component={Quotes} />
                  <Route path='/episodes' component={Episodes} />
                  <Route path='/characters' component={CardUser} />
                  <Route path='/login' component={LoginFullScreen} />
                  <Route path='/' component={LoginFullScreen} />
                </Switch>
              </div>
            </>
          </EpisodeContextProvider>
        </CharacterContextProvider>
      </LoginContextProvider>
    </Auth0Provider>
  );
};

export default App;
