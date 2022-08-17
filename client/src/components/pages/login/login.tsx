import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';

import {
  WrapperColumn,
  ButtonWithBorderRadius,
  WrapperWithMargin,
  Text,
  ErrorText,
} from 'atoms/atoms.styled';
import { ILoginData, IUser } from 'interfaces/user.interface';
import 'react-tabs/style/react-tabs.css';
import { SET_ERROR, SET_IS_LOGGED, SET_USER } from 'actions/actionTypes';
import { IRootStore } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';
import { login, loginGoogle } from 'api/users';
import { IError } from 'interfaces/error.interface';

interface IProps {
  isLogged: boolean;
  setUserInfo: (u: IUser) => void;
  setIsLogged: (e: boolean) => void;
  setGlobalError: (f: IError) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserInfo: (payload: IUser) => dispatch({ type: SET_USER, payload }),
  setGlobalError: (payload: IError) => dispatch({ type: SET_ERROR, payload }),
  setIsLogged: (payload: boolean) => dispatch({ type: SET_IS_LOGGED, payload }),
});

const requiredFieldMessage = 'This field is required';

const schema = yup.object().shape({
  login: yup.string().required(requiredFieldMessage),
  password: yup
    .string()
    .min(8, 'Minimum 8 characters')
    .max(16, 'Maximum 8 characters')
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g,
      'Use at least one upper and lower case letter and a number.',
    )
    .matches(
      /(?=.*^[a-zA-Z\d\s!'#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$)/g,
      'Uppercase and lowercase Latin letters, numbers from 0 to 9, symbols: (space)!"#$%&\\\'()*+,-./:;<=>?@[]^_`{|}~',
    )
    .required(requiredFieldMessage),
});

const NewEditUser = ({
  isLogged,
  setIsLogged,
  setUserInfo,
  setGlobalError,
}: IProps) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IUser>({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isLogged) {
      history.push('/films');
    }
  }, [isLogged]);

  const onSubmit = async (data: ILoginData) => {
    try {
      const res = await login(data);

      if (res.status === 'ERROR') {
        setError('password', { message: res.error });
      }
      if (res.status === 'SUCCESS') {
        setUserInfo(res.userData);
        setIsLogged(true);
        history.push('/films');
      }
    } catch (err: any) {
      setGlobalError(err.toString());
    }
  };

  const responseGoogle = async (response: CredentialResponse) => {
    await loginGoogle(response)
      .then((res) => {
        console.log(res);
        if (res.status === 'ERROR') {
          googleLogout();
          setIsError(true);
        }
        if (res.status === 'SUCCESS') {
          setUserInfo(res.userData);
          setIsLogged(true);
          history.push('/films');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WrapperColumn alignSide='center'>
        <WrapperWithMargin>
          <TextField
            className='input'
            {...register('login')}
            error={!!errors.login}
            helperText={errors.login?.message?.toString()}
            name='login'
            label='Login'
            placeholder='Example: Your name'
            type='string'
          />
        </WrapperWithMargin>
        <WrapperWithMargin>
          <TextField
            className='input'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            name='password'
            label='Password'
            placeholder='Password'
            type='password'
          />
        </WrapperWithMargin>
        <Text>
          <Link to='/registration'>Create account</Link>
        </Text>
        {
          isError ? <ErrorText>Something went wrong. Please try again later</ErrorText> : null
        }
        <ButtonWithBorderRadius type='submit'>Login</ButtonWithBorderRadius>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => setIsError(true)}
        />
      </WrapperColumn>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEditUser);
