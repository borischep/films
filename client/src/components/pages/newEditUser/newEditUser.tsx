import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
// import moment from 'moment';

import {
  WrapperColumn,
  ButtonWithBorderRadius,
  WrapperWithMargin,
  Text,
} from 'atoms/atoms.styled';
import { IUser } from 'interfaces/user.interface';
import 'react-tabs/style/react-tabs.css';
import { SET_ERROR, SET_IS_LOGGED, SET_USER } from 'actions/actionTypes';
import { IRootStore, userInitialState } from 'store';
import { IUserAction } from 'interfaces/userAction.interface';
import { editUser, registerUser } from 'api/users';
import { IError } from 'interfaces/error.interface';
import { Link, useHistory } from 'react-router-dom';
import CommonSelect from 'components/common/common-select';

interface IProps {
  user?: IUser;
  isLogged: boolean;
  setUserInfo: (u: IUser) => void;
  setEditUserInfo?: (e: boolean) => void;
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
  email: yup.string().email().required(requiredFieldMessage),
  gender: yup.string().required(requiredFieldMessage),
  genre: yup.string().required(requiredFieldMessage),
  filmsAmount: yup.number().required(requiredFieldMessage),
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
      'Uppercase and lowercase Latin letters, numbers from 0 to 9, symbols: (space)!\"#$%&\\\'()*+,-./:;<=>?@[]^_`{|}~',
    )
    .required(requiredFieldMessage),
});

const NewEditUser = ({
  user,
  isLogged,
  setEditUserInfo,
  setIsLogged,
  setUserInfo,
  setGlobalError,
}: IProps) => {
  const history = useHistory();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IUser>({ resolver: yupResolver(schema) });

  const genders = ['Male', 'Female', 'Prefer not to tell'];

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Historical',
    'Horror',
    'Science fiction',
    'War films',
    'Westerns',
  ];

  useEffect(() => {
    if (isLogged && !user) {
      history.push('/films');
    }
  }, [isLogged, user]);

  useEffect(() => {
    if (user) {
      reset(user);
    } else {
      reset(userInitialState);
    }
  }, [user]);

  const onSubmit = async (data: IUser) => {
    if (user) {
      try {
        const res = await editUser(data);
        if (res.status === 'ERROR') {
          setError('login', { message: res.error });
        }
        if (res.status === 'SUCCESS') {
          setUserInfo(data);
          if (setEditUserInfo) {
            setEditUserInfo(false);
          }
        }
      } catch (err: any) {
        setGlobalError(err);
      }
    } else {

      const res = await registerUser(data);
      if (res.status === 'ERROR') {
        setError('login', { message: res.error });
      }
      if (res.status === 'SUCCESS') {
        setUserInfo(data);
        setIsLogged(true);
        history.push('/films');
      }
    }
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
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            name='email'
            label='Email'
            type='email'
            placeholder='example@email.com'
          />
        </WrapperWithMargin>
        <CommonSelect
          {...register('gender')}
          helperText={errors.login?.message?.toString()}
          error={!!errors.gender}
          label='Gender'
          options={genders}
        />
        <CommonSelect
          {...register('genre')}
          helperText={errors.login?.message?.toString()}
          error={!!errors.genre}
          label='Favorite genre'
          options={genres}
        />
        <WrapperWithMargin>
          <TextField
            className='input'
            {...register('filmsAmount')}
            error={!!errors.filmsAmount}
            helperText={errors.filmsAmount?.message?.toString()}
            name='filmsAmount'
            InputProps={{ inputProps: { min: 0 } }}
            label='How many films do you want to watch in month'
            type='number'
            placeholder='16'
          />
        </WrapperWithMargin>
        <WrapperWithMargin>
          {
            !localStorage.getItem('thirdPartyLogin') || localStorage.getItem('thirdPartyLogin') === 'false' ?
              <TextField
                className='input'
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                name='password'
                label='Password'
                placeholder='Password'
                type='string'
              /> : null
          }
        </WrapperWithMargin>
        {!user ? (
          <Text>
            <Link to='/login'>Login to your account</Link>
          </Text>
        ) : null}
        <ButtonWithBorderRadius type='submit'>{!user ? 'Register' : 'Save'}</ButtonWithBorderRadius>
      </WrapperColumn>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEditUser);
