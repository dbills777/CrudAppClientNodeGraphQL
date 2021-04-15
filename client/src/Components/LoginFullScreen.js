import React, { useState } from 'react';
import { useLoginContext } from '../contexts/LoginContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PersonalCard from './PersonalCard';
import AuthLoginTest from './AuthLoginTest';
import { useAuth0 } from '@auth0/auth0-react';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '200px',
    maxWidth: '75vw',
    padding: '5rem',
  },
  image: {
    backgroundImage:
      'url(https://www.pngkit.com/png/full/364-3644816_related-wallpapers-los-pollos-hermanos-png.png)',
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'blur(40px)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  text: {
    color: '#444',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#018619',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    color: 'white',
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [member, setMember] = useState('');
  const authContext = useLoginContext();
  const { user, isAuthenticated } = useAuth0();

  const submitHandler = (values) => {
    setMember({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
    });
    authContext.login();
    authContext.setName(values.firstName);
    authContext.setEmail(values.email);
  };

  console.log(member, first_name, email, last_name);

  return !authContext.isAuth && !isAuthenticated ? (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.icon} />
          </Avatar>
          <Typography component='h1' variant='h5' className={classes.text}>
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a Valid Email address')
                .max(30)
                .required('Email is Required'),
              firstName: Yup.string()
                .min(3, 'First Name Must be 3 characters or more')
                .max(40, 'Name is too long')
                .required('First Name is Required'),
              lastName: Yup.string()
                .min(3, 'Last Name Must be 3 characters or more')
                .max(40, 'Name is too long')
                .required('Last Name is Required'),
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
              try {
                console.log(values.email, values.firstName, values.lastName);
                setFirstName(values.firstName);
                setLastName(values.lastName);
                setEmail(values.email);
                submitHandler(values);
                authContext.login();
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                className={classes.form}
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit}
              >
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  name='firstName'
                  autoFocus
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  required
                  fullWidth
                  label='Email Address'
                />
                <ButtonGroup size='large' fullWidth variant='text'>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    className={classes.submit}
                  >
                    Sign-Up
                  </Button>
                  <AuthLoginTest
                    type='submit'
                    fullWidth
                    variant='contained'
                    className={classes.submit}
                    onSubmit={(
                      values,
                      { setErrors, setStatus, setSubmitting }
                    ) => {
                      try {
                        setFirstName(user.name);
                        setEmail(user.email);
                        submitHandler(values);
                        authContext.login();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  ></AuthLoginTest>
                </ButtonGroup>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  ) : (
    isAuthenticated && <PersonalCard />
  );
}
