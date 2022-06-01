import React, { FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import Animation from '../../components/Animation';
import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import { RegistrationInServer } from '../../store/slices/auth';
import useValidateForm from '../../components/hooks/validateForm';
import { useAppDispatch } from '../../types/hooks/hooks';
import { MyTypographyError } from '../../components/MyTypographyError';

const styles = {
  Registration: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'color.background',
    top: '50%',
    left: '0',
    width: '100%',
    height: 'auto',
    marginTop: '-200px',
    overflow: 'hidden',
    paddingBottom: '15px',
  },
};
const Registration = () => {
  const validate = useValidateForm();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addUser = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    await dispatch(RegistrationInServer(validate.userDetails));
    validate.setUserDetails({ username: '', email: '', password: '' });
  };
  const userRegistrationNotification = () => {
    enqueueSnackbar('User registered', {
      variant: 'success',
    });
  };

  return (
    <Box sx={styles.Registration}>
      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h5">Create a new user </Typography>
        <Box
          sx={{ paddingTop: '10px', position: 'relative', zIndex: '2' }}
          component="form"
          onSubmit={addUser}
        >
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '26ch', display: 'flex' },
            }}
          >
            {(validate.userNameDirty && validate.validateError.userNameError) && (
              <MyTypographyError errorMassage={validate.validateError.userNameError} />
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
            {(validate.emailDirty && validate.validateError.emailError) && (
              <MyTypographyError errorMassage={validate.validateError.emailError} />
            )}
            <TextField
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              value={validate.userDetails.email}
              onChange={validate.emailHandler}
              onBlur={validate.blurHandler}
            />
            {(validate.passwordDirty && validate.validateError.passwordError) && (
              <MyTypographyError errorMassage={validate.validateError.passwordError} />
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
              onClick={userRegistrationNotification}
              disabled={!validate.formValid}
              sx={{ marginLeft: '10px' }}
              variant="contained"
              type="submit"
            >
              Create New
              Account
            </Button>
          </Stack>
          <Typography sx={{ marginTop: '20px' }} variant="body1">
            <NavLink to={ROUTE_LINKS.login}>Back To Login</NavLink>
          </Typography>
        </Box>
      </Box>
      <Animation />
    </Box>

  );
};

export default Registration;
