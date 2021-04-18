import React, { useState } from 'react';
// import axios from 'axios';
import { useQuery, gql, useMutation } from '@apollo/client';
import {
  Container,
  makeStyles,
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  ListItem,
  List,
  Slide,
  DialogActions,
  AppBar,
  Toolbar,
  Button,
  Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    width: 340,
    margin: 10,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    marginTop: '3rem',
  },
  typeWidth: {
    width: '100%',
  },
  media: {
    borderRadius: '15px',
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}));

const ALL_PRODUCTS = gql`
  query ProductsAndCategories {
    allProducts {
      id
      title
      price
      description
      category
      image
    }
    allCategories{
      description
    }

  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: Int!,$title: String!,$price: String!,$description: String!,$category: String!,$image: String!) {
    updateProduct (id: $id, data: { title: $title, price: $price, description: $description, category: $category, image: $image }
    ) {
      id
    }
  }
`;
const CREATE_CATEGORY = gql`
  mutation createCategory($id: Int!, $productTitle: String!) {
    createCategory(
      id: $id
      data: {
        productTitle: $productTitle
        price: $price
      }
    ) {
      id
    }
  }
`;
const CREATE_PRODUCT = gql`
  mutation createProduct(
    $title: String!
    $price: String!
    $description: String!
    $category: String!
    $image: String!
  ) {
    createProduct(
      data: { title: $title, price: $price, description: $description, category: $category, image: $image }
    ) {
      id
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const ProductList = () => {
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = useState({ title: '' });
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const { loading, error, data } = useQuery(ALL_PRODUCTS);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  // const [createProduct] = useMutation(CREATE_PRODUCT);
  // console.log(productList);
  const handleDelete = async () => {
    setDeleteOpen(false);
    console.log(selectedProduct.id);
    try {
      deleteProduct({ variables: { id: selectedProduct.id } });
    } catch (err) {
      console.error(err);
    }
  };
 const handleClickOpen = () => {
   setOpen(true);
 };
  const handleClickEditOpen = (product) => {
    console.log(product);
    setSelectedProduct(product.product);
    setEditOpen(true);
  };
  const handleClickDeleteOpen = (product) => {
    setSelectedProduct(product.product);
    setDeleteOpen(true);
  };
  // Add a new Product section
   const handleClose = async () => {
     setOpen(false);
   };

    //  end Add a new Product Section.
  const handleCloseEdit = () => {
    setEditOpen(false);
  };
  const handleUpdate = async () => {
    console.log('hit handle update', title, description,price, category, image );
    setEditOpen(false);

    updateProduct({
      variables: {
        id: selectedProduct.id,
        title: title,
        description: description,
        price: price,
        category: category,
        image: image,
      },
    });
    createCategory({
      variables: {
        id: selectedProduct.id,
        description: category,
      }
    })
  };
  const handleAddProduct = async () => {
    console.log('hit handle update', title, description,price, category, image );
    setOpen(false);
    createProduct({
      variables: {
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
      },
    });

  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  if (loading) {
    return (
      <Container className={classes.root}>
        <Typography className={classes.messages}>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return <Typography className={classes.messages}>{`${error.message}`}</Typography>;
  }
  const productList = data.allProducts;
  const categoryList = data.allCategories;

const filteredArr = categoryList.reduce((acc, current) => {
  const x = acc.find((item) => item.description === current.description);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);
console.log(filteredArr)
  return (
    <>
      <div>
        <IconButton onClick={handleClickOpen} aria-label='add-character'>
          <AddCircleIcon />
          <h1>+Add Product</h1>
        </IconButton>
      </div>
      <div>
        <label for='categories'>Find By Category:</label>
        <select name='categories' id='cars'>
          {filteredArr.map((category) => {
            return <option value={category.description}>{category.description}</option>;
          })}
        </select>
      </div>
      <Container className={classes.root}>
        {productList.map((product) => {
          return (
            <Card className={classes.card} key={product.id}>
              <CardMedia
                component='img'
                height='300'
                className={classes.media}
                image={product.image}
                title={product.title}
              />
              <CardActions className={classes.actions}>
                <IconButton aria-label='edit' onClick={() => handleClickEditOpen({ product })}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({ product })}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {product.title}
                </Typography>
                <Box className={classes.content}>
                  <Typography variant='h5' color='secondary'>
                    Price: ${product.price}
                  </Typography>
                  <Typography variant='subtitle1' color='primary'>
                    Dpt: {product.category}
                  </Typography>
                </Box>
                <Box textAlign='center'>
                  <Typography variant='h6' color='textSecondary'>
                    Item Details:
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {product.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Container>
      <form>
        <Dialog
          fullWidth
          maxWidth='lg'
          open={editOpen}
          className={classes.dialog}
          onClose={handleCloseEdit}
          aria-labelledby='edit-dialog-title'
        >
          <DialogTitle id='edit-dialog-title'>Product Edit Form</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit A products Details And Save the Changes</DialogContentText>
            <TextField
              autoFocus
              id='title'
              name='title'
              label='Product Title'
              type='text'
              fullWidth
              placeholder={selectedProduct.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Box className={classes.content}>
              <TextField
                autoFocus
                id='price'
                name='price'
                label='Enter Price Here'
                type='text'
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                autoFocus
                name='price'
                id='category'
                label='Enter Category Here'
                type='text'
                // value={selectedProduct.category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                autoFocus
                id='description'
                name='description'
                label='product Description'
                type='textarea'
                fullWidth
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                autoFocus
                id='image'
                name='image'
                label='Enter Image URL'
                type='textarea'
                fullWidth
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary' onClick={() => handleUpdate()}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* post diaglog screen */}
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title2}>
                Add A New Product
              </Typography>
              <Button autoFocus color='inherit' onClick={() => handleAddProduct()}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <List>
            <ListItem button>
              <TextField
                autoFocus
                required
                autoComplete='off'
                margin='dense'
                id='title'
                label='Product Title'
                type='text'
                fullWidth
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='price'
                label='Price'
                type='text'
                fullWidth
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='category'
                label='category'
                type='Text'
                fullWidth
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='description'
                label='description'
                type='Text'
                fullWidth
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </ListItem>
            <ListItem button>
              <TextField
                required
                autoComplete='off'
                margin='dense'
                id='image'
                label='imageURL'
                type='Text'
                fullWidth
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </ListItem>

            <Divider />
          </List>
        </Dialog>
      </div>
    </>
  );
};

export default ProductList;
