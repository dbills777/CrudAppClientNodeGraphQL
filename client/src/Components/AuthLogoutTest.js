import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const AuthLogoutTest = () => {
  const { logout } = useAuth0();

  return (
    <NavLink to='/login'>
      <Button
        style={{
          color: 'white',
          backgroundColor: 'black',
          marginRight: '1rem',
        }}
        variant='contained'
        onClick={() => logout()}
      >
        Logout
      </Button>
    </NavLink>
  );
};

export default AuthLogoutTest;
