import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Card.css';
import { useAuth0 } from '@auth0/auth0-react';
import AllCards from './Card';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    minWidth: 200,
    height: '100%',
    margin: '10px',
    borderRight: '3px solid #999',
    borderBottom: '3px solid #999',
    padding: '3em',
    borderRadius: '1rem',
    position: 'relative',
    zIndex: '1',
    backdropFilter: 'blur(40px)',
    backgroundColor: 'gray',
  },
  media: {
    width: '100%',
    height: '150px',
    paddingTop: '56.25%',
    backdropFilter: 'blur(40px)',
    borderRadius: '1rem',

    position: 'relative',
  },
  clicked: {
    color: 'red',
  },

  expand: {
    maxWidth: 200,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    color: '#fff',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '100%',
    padding: '2px',
    margin: '5px',
    borderRadius: '50%',
    backgroundColor: 'light-gray',
  },
}));

export default function ListCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (id) => {
    setExpanded(!expanded);
  };

  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <Card key={user.family_name} className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={classes.title}
          subheader={user.name}
        />
        <CardMedia
          className={classes.media}
          image={user.picture}
          title='profile'
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            <strong>Nick Name: </strong>
            {user.nickname}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick(user.name)}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <strong>INFO:</strong>
            </Typography>
            <Typography paragraph>
              <strong>Email: </strong>
              {user.email}
            </Typography>

            <Typography paragraph>
              <strong>Occupation: </strong>
              Guest User
            </Typography>
            <Typography paragraph>
              <strong>Portrayed by : </strong>
              {user.given_name}
            </Typography>
            <Typography paragraph>
              <strong>Living Status: </strong>
              Alive
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

      <AllCards />
    </>
  ) : (
    <AllCards />
  );
}
