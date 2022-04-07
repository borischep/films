import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonWithBorderRadius, WrapperColumn } from 'atoms/atoms.styled';

export const FormContext = React.createContext({
  form: {},
  handleFormChange: () => {},
});

const Form = ({ children, formInitialValues, submit }) => {
  const [form, setForm] = useState(formInitialValues);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  const submitForm = (e) => e.preventDefault();

  return (
    <form onSubmit={submitForm}>
      <FormContext.Provider value={{
        form,
        handleFormChange,
      }}
      >
        {children}
      </FormContext.Provider>
      <WrapperColumn alignSide="center">
        <ButtonWithBorderRadius
          type="submit"
          onClick={() => submit(form)}
        >
          Save
        </ButtonWithBorderRadius>
      </WrapperColumn>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  formInitialValues: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.object,
  ])),
  submit: PropTypes.func,
};

Form.defaultProps = {
  formInitialValues: {},
  submit: () => {},
};

export default Form;
