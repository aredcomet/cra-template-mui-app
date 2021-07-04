import React, { useState } from 'react';
import {
  TextField, makeStyles, Button, Box, Container, Typography,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Page from '../../components/page';
import { baseHeaders, baseUrl } from '../../utils/config';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({ non_field_errors: null });
  const { handleSubmit, control } = useForm();

  const onSubmit = (values) => {
    axios.post(`${baseUrl}/auth-token/`, values, baseHeaders)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        history.push('/users');
      }).catch((err) => setError(err.response.data));
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error.non_field_errors ? <Typography color="error">{error.non_field_errors}</Typography> : null}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                /* eslint react/jsx-props-no-spreading: */
                  {...field}
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  label="Username"
                  placeholder="Username"
                  type="text"
                  size="small"
                  className={classes.field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                /* eslint react/jsx-props-no-spreading: */
                  {...field}
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  size="small"
                  autoComplete="true"
                  className={classes.field}
                />
              )}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

Login.propTypes = {};

export default Login;
