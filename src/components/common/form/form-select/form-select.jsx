import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { WrapperColumn, Select } from 'atoms/atoms.styled';
import { FormContext } from '../form';

const FormSelect = ({
  label, name, options,
}) => {
  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <WrapperColumn alignSide="left">
      <label htmlFor="select">{label}</label>
      <Select
        width="300px"
        border="1px solid #b9b9b9"
        margin="10px 0 0 0"
        id="select"
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      >
        <option defaultChecked value="">Not selected</option>
        {
          options.map((el) => (
            <option key={el} value={el}>{el}</option>
          ))
        }
      </Select>
    </WrapperColumn>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

FormSelect.defaultProps = {
  options: {},
};

export default FormSelect;
