import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WrapperColumn, Input } from '../../atoms/atoms.styled';
import { FormContext } from '../form/form';

const FormInput = ({
  label, type, name, placeholder,
}) => {
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

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

FormInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default FormInput;
