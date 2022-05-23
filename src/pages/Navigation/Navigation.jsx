import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { Typography } from '@mui/material';

import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import {
  logout,
  userIsAuthorized,
} from '../../store/slices/auth';
import { AuthContext } from '../../context/context';

const styles = {
  nav: {
    position: 'absolute',
    paddingLeft: '5px',
    right: '20px',
    top: '20px',
    zIndex: '99',
  },
};

const Navigation = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });
  const onClickSignOut = () => {
    setIsAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAuth');
    navigate(ROUTE_LINKS.login);
    dispatch(userIsAuthorized(false));
    dispatch(logout());
  };

  return (
    isAuth
      ? (
        <Typography sx={styles.nav}>
          <NavLink to="/todo" style={isActiveStyle}>Todos </NavLink>
          <Link to="/login" onClick={onClickSignOut}> SignOut </Link>
        </Typography>
      )
      : (
        <Typography sx={styles.nav}>
          <NavLink to="/login" style={isActiveStyle}>LogIn </NavLink>
          <NavLink to="/registration" style={isActiveStyle}>SignUp </NavLink>
        </Typography>
      )
  );
};

export default Navigation;
