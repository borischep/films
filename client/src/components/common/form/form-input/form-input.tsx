import React from 'react';
import { WrapperColumn, Input, ErrorText } from 'atoms/atoms.styled';
import { IUser } from 'interfaces/user.interface';

interface IProps {
  label: string;
  type: string;
  name: string;
  helperText?: string;
  placeholder: string;
  register: any;
}

const FormInput = ({
  label, type, name, placeholder, register, helperText,
}: IProps) => {  
  return (
    <WrapperColumn alignSide="left">
      <label htmlFor="input">{label}</label>
      <Input
        {...register(label)}
        width="300px"
        border="1px solid #b9b9b9"
        margin="10px 0 0 0"
        id="input"
        name={name}
        placeholder={placeholder}
        min="0"
        type={type}
      />
      <ErrorText>{helperText}</ErrorText>
    </WrapperColumn>
  );
};

export default FormInput;
