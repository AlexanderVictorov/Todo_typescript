import React, { useMemo } from 'react';
import { Pagination } from '@mui/material';

const ShowPagination = ({ todoPerPage, total, paginate }) => {
  const pageNumber = useMemo(() => Math.ceil(total / todoPerPage), [total, todoPerPage]);

  return (
    <Pagination
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      color="primary"
      count={pageNumber}
      onChange={(event, page) => paginate(page)}
    />
  );
};

export default ShowPagination;
