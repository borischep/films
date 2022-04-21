import React, { useState } from 'react';
import { IUser } from 'interfaces/user.interface';
import { ButtonWithBorderRadius, WrapperColumn } from 'atoms/atoms.styled';

interface IProps {
  children:
  | React.ReactChild
  | React.ReactChild[];
  formInitialValues: IUser;
  submit: (f: IUser) => void;
}

interface IContext {
  form: IUser | Record<string, never>;
  handleFormChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const FormContext = React.createContext<IContext>({
  form: {},
  handleFormChange: () => {},
});

const Form = ({ children, formInitialValues, submit }: IProps) => {
  const [form, setForm] = useState<IUser>(formInitialValues);

  const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  const submitForm = (e: React.FormEvent) => e.preventDefault();

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

export default Form;
