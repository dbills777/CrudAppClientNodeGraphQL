import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#7AC9D7',
    color: 'white',
  },
  icon: {
    color: 'white',
  },
}));
const AuthLoginTest = () => {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()} fullWidth variant='contained' className={classes.submit}>
        Google Login
      </Button>
    )
  );
};

export default AuthLoginTest;
