import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: '2rem',
    zIndex: '1',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(120, 120, 120, 0.4)',
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: '50%',
    margin: '0,auto',
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.profile}
              component='img'
              alt={user.name}
              height='140'
              width='140'
              image={user.picture}
              title={user.name}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {user.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                First Name: {user.given_name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Last Name: {user.family_name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Typography variant='body2' color='textSecondary' component='p'>
              Email Address: {user.email}
            </Typography>
          </CardActions>
          {console.log(user)}
        </Card>
      </>
    )
  );
}
