import React, { useContext } from 'react';
import { WrapperColumn, Input } from 'atoms/atoms.styled';
import { FormContext } from '../form';
import { IUser } from 'interfaces/user.interface';

interface IProps {
  label: string;
  type: string;
  name: keyof IUser;
  placeholder: string;
}

const FormInput = ({
  label, type, name, placeholder,
}: IProps) => {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <WrapperColumn alignSide="left">
      <label htmlFor="input">{label}</label>
      <Input
        width="300px"
        border="1px solid #b9b9b9"
        margin="10px 0 0 0"
        id="input"
        placeholder={placeholder}
        min="0"
        name={name}
        type={type}
        value={form[name]}
        onChange={handleFormChange}
      />
    </WrapperColumn>
  );
};

export default FormInput;
