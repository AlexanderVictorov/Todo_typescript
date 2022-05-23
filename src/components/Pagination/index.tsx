import React, { FC, useMemo } from 'react';
import { Pagination } from '@mui/material';

interface IProps {
  todoPerPage: number,
  total: number,
  paginate: (page:number) => void
}

const ShowPagination: FC<IProps> = ({ todoPerPage, total, paginate }) => {
  const pageNumber = useMemo(() => Math.ceil(total / todoPerPage), [total, todoPerPage]);

  return (
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      color="primary"
      count={pageNumber}
      onChange={(event, page) => paginate(page)}
    />
  );
};

export default ShowPagination;
