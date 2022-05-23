import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import ROUTE_LINKS from '../../components/MyRouters/routeLink';
import { logout, userIsAuthorized } from '../../store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../types/hooks/hooks';

const styles = {
  nav: {
    position: 'absolute',
    paddingLeft: '5px',
    right: '20px',
    top: '20px',
    zIndex: '99',
  },
};

type TIsActiveArgs = { isActive: boolean };
type TIsActiveReturnValue = { fontWeight: 'bold' | 'normal' };
type TIsActiveStyle = ({ isActive }: TIsActiveArgs) => TIsActiveReturnValue;

const Navigation = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isActiveStyle: TIsActiveStyle = ({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' });
  const onClickSignOut = () => {
    localStorage.removeItem('token');
    navigate(ROUTE_LINKS.login);
    dispatch(userIsAuthorized(false));
    dispatch(logout());
  };

  return (
    isLogin
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
