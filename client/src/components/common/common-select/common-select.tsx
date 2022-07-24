import React, { ReactNode } from 'react';
import { WrapperWithMargin } from 'atoms/atoms.styled';
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';

interface IProps {
  options: string[];
  error?: boolean;
  label: string;
  helperText?: ReactNode;
  value?: string;
  onHandelChange?: (value: string) => void;
}

const CommonSelect = ({
  options, error = false, label, helperText, value = '', onHandelChange, ...props
}: IProps, ref: React.ForwardedRef<HTMLUListElement>) => {
  const onChange = (event: SelectChangeEvent<string>) => {
    if (!onHandelChange) {
      return;
    }
    onHandelChange(event?.target?.value);
  };
  
  return (
    <WrapperWithMargin>
      <FormControl error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          error={error}
          className='select'
          {...props}
          ref={ref}
          label={label}
          defaultValue={value}
          onChange={onChange}
        >
          {options.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
    </WrapperWithMargin>
  );
};

export default React.forwardRef(CommonSelect);
