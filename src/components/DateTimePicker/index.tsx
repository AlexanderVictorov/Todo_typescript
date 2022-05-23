import React, { FC, useEffect, useState } from 'react';

import { Box, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { leadTimeTodo } from '../../store/slices/todos';
import { useAppDispatch } from '../../types/hooks/hooks';

interface IPropsIP {
  id:number
}

const DateTimePickers: FC<IPropsIP> = ({ id }) => {
  const [value, setValue] = useState<Date | null>(new Date('2022-04-27T00:00:00'));
  const [closeDatePicker, setCloseDatePicker] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!closeDatePicker) {
      if (!value) return;
      const newTime: number = Date.parse(value.toString());
      dispatch(leadTimeTodo({ id, newTime }));
    }
  }, [value]);

  const addTimeTodo = () => {
    setCloseDatePicker(false);
  };
  const handleChange = (newValue:Date | null) => {
    setValue(newValue);
  };

  const renderInput = ({ InputProps, inputRef, inputProps }: TextFieldProps) => (
    // @ts-ignore todo
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
        renderInput={renderInput}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickers;
