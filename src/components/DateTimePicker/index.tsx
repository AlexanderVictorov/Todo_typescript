import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { leadTimeTodo } from '../../store/slices/todos';

interface IPropsIP {
  id:number
}
interface IRender {
  InputProps:any,
  inputRef:any,
  inputProps:any,
}
const DateTimePickers: FC<IPropsIP> = ({ id }) => {
  const [value, setValue] = useState<Date | null | string >(new Date('2022-04-27T00:00:00'));
  const [closeDatePicker, setCloseDatePicker] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!closeDatePicker) {
      if (typeof value === 'string') {
        const newTime: number = Date.parse(value);
        dispatch(leadTimeTodo({ id, newTime }));
      }
    }
  }, [value]);

  const addTimeTodo = () => {
    setCloseDatePicker(false);
  };
  const handleChange = (newValue:Date | null) => {
    setValue(newValue);
  };
  // @ts-ignore
  const renderInput = ({ InputProps, inputRef, inputProps }) => (
    <Box
      sx={{
        '& .MuiInputAdornment-root .MuiButtonBase-root': {
          margin: '0',
          padding: '0',
          color: '#1976d2',
        },
      }}
      ref={inputRef}
      {...inputProps}
    >
      {InputProps?.endAdornment}
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Custom"
        value={value}
        onClose={addTimeTodo}
        onChange={handleChange}
        // @ts-ignore
        renderInput={renderInput}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickers;
