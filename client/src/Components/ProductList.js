import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, gql } from '@apollo/client';
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
import { Formik } from 'formik';
import * as Yup from 'yup';

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

const ProductList = () => {
  const classes = useStyles();
  const [selectedProduct, setselectedProduct] = useState({ title: '' });
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data } = useQuery(ALL_PRODUCTS);
  //   const {  data } = useQuery(ALL_CATEGORIES);
  const productList = data.allProducts;
  console.log(productList);

  const handleDelete = async (product) => {
    setselectedProduct(product.product);
    setDeleteOpen(false);
  };

  const handleClickEditOpen = (product) => {
    setselectedProduct(product.product);
    setEditOpen(true);
  };
  const handleClickDeleteOpen = (product) => {
    setselectedProduct(product.title);
    setDeleteOpen(true);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleUpdate = async (values) => {
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

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
      <Dialog
        fullWidth
        maxWidth='lg'
        open={editOpen}
        className={classes.dialog}
        onClose={handleCloseEdit}
        aria-labelledby='edit-dialog-title'
      >
        <Formik
          initialValues={{
            title: selectedProduct?.title,
            price: selectedProduct?.price,
            description: selectedProduct?.description,
            category: selectedProduct?.category,
            image: selectedProduct?.image,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter product title.').required('Title is Required'),
            price: Yup.number('product price number').required('Price is Required'),
            description: Yup.string('product description').required('Description is Required'),
            category: Yup.string('product category').required('Category is Required'),
            image: Yup.string('product image').required('Image is Required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await handleUpdate(values);
              handleCloseEdit();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className={classes.dialogContent}>
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
                  placeholder={values.title}
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    id='price'
                    name='price'
                    label='price'
                    type='number'
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Box>
                <Box>
                  <TextField
                    autoFocus
                    name='category'
                    id='category'
                    label='category'
                    type='text'
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.category && errors.category)}
                    helperText={touched.category && errors.category}
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
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Box>
                <Box>
                  <TextField
                    autoFocus
                    id='image'
                    name='image'
                    label='product image'
                    type='textarea'
                    fullWidth
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.image && errors.image)}
                    helperText={touched.image && errors.image}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
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
