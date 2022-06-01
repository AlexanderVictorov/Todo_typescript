import { Typography } from '@mui/material';
import React from 'react';

type TypographyError ={
  errorMassage:string
}
// eslint-disable-next-line max-len
export const MyTypographyError = ({ errorMassage }: TypographyError) => <Typography sx={{ fontSize: '13px', margin: '0 auto!important' }} color="error">{errorMassage}</Typography>;
