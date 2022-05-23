import React, { FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import { LoginInServer } from '../../store/slices/auth';

import Animation from '../../components/Animation';
import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import useValidateForm from '../../components/hooks/validateForm';
import { useAppDispatch } from '../../types/hooks/hooks';

const styles = {
  Login: {
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
    paddingBottom: '15px',
    position: 'absolute',
    top: '25%',
    left: '0px',
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
  },
};

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const validate = useValidateForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userNotification = () => {
    enqueueSnackbar('User not registered', {
      variant: 'error',
    });
  };
  const LoginFormHandler = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    await dispatch(LoginInServer(validate.userDetails));
    if (localStorage.getItem('token')) {
      navigate(ROUTE_LINKS.todo);
    } else {
      userNotification();
      validate.setUserDetails({ username: '', email: '', password: '' });
    }
  };

  return (
    <Box sx={styles.Login}>
      <Box>
        <Typography sx={{ marginTop: '20px' }} variant="h2">Welcome</Typography>
        <Box
          sx={{ marginLeft: '35px', position: 'relative', zIndex: '2' }}
          component="form"
          onSubmit={LoginFormHandler}
        >
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '26ch', display: 'flex' },
            }}
          >
            {(validate.userNameDirty && validate.validateError.userNameError) && (
              <Typography sx={{ fontSize: '12px' }} color="error">
                {validate.validateError.userNameError}
              </Typography>
            )}
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              value={validate.userDetails.username}
              onChange={validate.userNameHandler}
              onBlur={validate.blurHandler}
            />
            {(validate.emailDirty && validate.validateError.emailError)
              && <Typography sx={{ fontSize: '12px' }} color="error">{validate.validateError.emailError}</Typography>}
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              value={validate.userDetails.email}
              onChange={validate.emailHandler}
              onBlur={validate.blurHandler}
            />
            {(validate.passwordDirty && validate.validateError.passwordError)
              && (
                <Typography sx={{ fontSize: '12px' }} color="error">
                  {validate.validateError.passwordError}
                </Typography>
              )}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={validate.userDetails.password}
              onChange={validate.passwordHandler}
              onBlur={validate.blurHandler}
            />
          </Box>
          <Stack spacing={2} direction="row">
            <Button
              disabled={!validate.formValid}
              sx={{ marginLeft: '9px', width: '207px' }}
              variant="contained"
              type="submit"
            >
              Log
              In
            </Button>
          </Stack>
          <Typography sx={{ marginTop: '10px' }} variant="body1" className="message">
            Not registered?
            <NavLink to={ROUTE_LINKS.registration}> Create an account </NavLink>
          </Typography>
        </Box>
      </Box>
      <Animation />
    </Box>
  );
};

export default Login;
