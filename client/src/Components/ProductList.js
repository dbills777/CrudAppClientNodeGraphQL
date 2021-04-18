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
  Input,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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
  query {
    allProducts {
      id
      title
      price
      description
      category
      image
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
// const CREATE_PRODUCT = gql`
//   mutation createProduct(
//     $id: Int!
//     $title: String!
//     $price: String
//     $description: String
//     $category: String
//     $image: String
//   ) {
//     updateProduct(
//       id: $id
//       data: { title: $title, price: $price, description: $description, category: $category, image: $image }
//     ) {
//       id
//     }
//   }
// `;
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
  const { loading, error, data } = useQuery(ALL_PRODUCTS);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
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

  const handleClickEditOpen = (product) => {
    console.log(product);
    setSelectedProduct(product.product);
    setEditOpen(true);
  };
  const handleClickDeleteOpen = (product) => {
    setSelectedProduct(product.product);
    setDeleteOpen(true);
  };
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

  return (
    <>
      <form>
        <Input placeholder='Search' />
        <IconButton aria-label='search'>
          <SearchIcon />
        </IconButton>
      </form>
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
    </>
  );
};

export default ProductList;
