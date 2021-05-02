import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Slide,
  ListItem,
  AppBar,
  Toolbar,
  List,
  Divider,
} from '@material-ui/core';
import './Card.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
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
    backgroundColor: 'rgba(195, 195, 195, 0.621)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // color: 'white',
  },
  appBar: {
    position: 'relative',
  },
  title2: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
    color: 'white',
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
  },
  form: {
    width: '100vw',
    fontSize: '3rem',
    backgroundColor: 'rgba(195, 195, 195, 0.621)',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
}));

const ListCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState('');
  const [newName, setNewName] = useState(null);
  const [newNickName, setNewNickName] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [postData, setPostData] = useState({ image: '', nickname: '', name: '', occupation: '', portrayedby: '' });
  const url = `https://immense-island-84831.herokuapp.com/character`;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const updateField = (e) => {
    setPostData({
      ...postData,
      [e.target.id]: e.target.value,
      // occupation: ['Actor'],
      // image: 'https://picsum.photos/200/300',
      status: 'Alive',
      char_id: 0,
    });
  };
  const handleClose = async () => {
    setOpen(false);
    postNewCharacter();
    // console.log(postData)
  };
  const postNewCharacter = async () => {
    console.log(postData);
    try {
      await axios.post(`${url}/`, {
        name: postData.name,
        image: postData.image,
        nickname: postData.nickname,
        occupation: postData.occupation,
        status: postData.status,
        portrayed: postData.portrayedby,
        char_id: postData.char_id,
      });
    } catch (error) {
      console.error(error);
    }
    getCharacters();
  };

  const getCharacters = async () => {
    try {
      const response = await axios.get(`${url}`);
      const sorted = response.data.sort((a, b) => a.char_id - b.char_id);
      setCharacters(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters();
    // eslint-disable-next-line
  }, []);

  const handleClickDeleteOpen = async (item) => {
    await setCurrentCharacter(item.item);
    // console.log("mongoID to delete from db", item.item._id)
    setOpenDialog(!openDialog);
  };
  const handleClickEditOpen = async (item) => {
    await setCurrentCharacter(item.item);
    setOpenEditDialog(!openEditDialog);
  };
  const closeDialog = () => {
    setOpenDialog(!openDialog);
  };
  const closeEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };
  const deleteFromDB = async () => {
    setOpenDialog(!openDialog);
    try {
      await axios.delete(`${url}`, {
        data: {
          productID: currentCharacter._id,
        },
      });
      getCharacters();
    } catch (error) {
      console.error(error);
    }
  };
  const editInfoInDB = async () => {
    closeEditDialog();
    console.log(newName);
    console.log(currentCharacter);
    if (newName) {
      try {
        await axios.put(`${url}/update-name`, {
          characterID: currentCharacter._id,
          name: newName,
        });
        setNewName('');
        getCharacters();
      } catch (error) {
        console.error(error);
      }
    }
    if (newNickName) {
      try {
        await axios.put(`${url}/update-nick-name`, {
          characterID: currentCharacter._id,
          nickname: newNickName,
        });
        setNewName('');
        getCharacters();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleExpandClick = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };
  const handleSeach = async () => {
    console.log(searchTerm);
    if (!searchTerm) {
      getCharacters();
    } else {
      try {
        const response = await axios.get(`${url}/search?term=${searchTerm}`);
        const sorted = response.data.sort((a, b) => a.char_id - b.char_id);
        setCharacters(sorted);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={classes.form}>
        <TextField
          className={classes.text}
          placeholder='Search'
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSeach();
          }}
        />
        <IconButton onClick={handleClickOpen} aria-label='add-character'>
          <AddCircleIcon />
        </IconButton>
      </div>
      {characters.map((item) => {
        return (
          <Card key={item._id} className={classes.root}>
            <CardHeader
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              onClick={() => handleClickEditOpen({ item })}
              title={classes.title}
              subheader={item.name}
            />
            <CardMedia className={classes.media} image={item.image} title={item.name} />
            <CardContent>
              <Typography variant='body2' component='p'>
                <strong>Nick Name: </strong>
                {item.nickname}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({ item })}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label='Edit' onClick={() => handleClickEditOpen({ item })}>
                <EditIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand[item._id], {
                  [classes.expandOpen]: expanded[item._id],
                })}
                onClick={() => handleExpandClick(item._id)}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded[item._id]} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  <strong>INFO:</strong>
                </Typography>

                <Typography paragraph>
                  <strong>Occupation: </strong>
                  {item.occupation.join(', ')}
                </Typography>
                <Typography paragraph>
                  <strong>Portrayed by : </strong>
                  {item.portrayed}
                </Typography>
                <Typography paragraph>
                  <strong>Living Status: </strong>
                  {item.status}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
      {/* Delete Character Dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContentText>Are you sure you want to delete {currentCharacter.nickname}?</DialogContentText>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={deleteFromDB}>Delete Character</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Name dialog */}
      <Dialog open={openEditDialog} onClose={closeEditDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit: {currentCharacter.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Current Name: {currentCharacter.name}</DialogContentText>
          <DialogContentText>Current Nick-Name: {currentCharacter.nickname}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='New Name'
            type='text'
            fullWidth
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin='dense'
            id='nick-name'
            label='New Nick Name'
            type='text'
            fullWidth
            onChange={(e) => {
              setNewNickName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={editInfoInDB} color='primary'>
            Submit Changes
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Name Dialog */}
      {/* post diaglog screen */}
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title2}>
                Add A New Character to Database
              </Typography>
              <Button autoFocus color='inherit' onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <TextField
                autoFocus
                required
                autoComplete='off'
                margin='dense'
                id='name'
                label='Character Name'
                type='text'
                fullWidth
                onChange={updateField}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='nickname'
                label='Character Nick-Name'
                type='text'
                fullWidth
                onChange={updateField}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='portrayedby'
                label='Portrayed By: '
                type='Text'
                fullWidth
                onChange={updateField}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='image'
                label='image: '
                type='Text'
                fullWidth
                onChange={updateField}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='occupation'
                label='Occupation By: '
                type='Text'
                fullWidth
                onChange={updateField}
              />
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>
    </>
  );
};

export default ListCard;
