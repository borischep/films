import React, { useState, useEffect, Dispatch } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumn, Text, Input, ButtonWithBorderRadius,
} from 'atoms/atoms.styled';
import { SET_USER, SET_IS_LOGGED } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IUserAction } from 'interfaces/userAction.interface';
import { IUser } from 'interfaces/user.interface';

interface IProps {
  setIsLogged: (e: boolean) => void;
  setUser: (f: IUser) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUser: (payload: IUser) => 
    dispatch({ type: SET_USER, payload }),
  setIsLogged: (payload: boolean) =>
    dispatch({ type: SET_IS_LOGGED, payload }),
});

const Login = ({ setIsLogged, setUser }: IProps) => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const userInfoInitialState = {
    email: '',
    birthday: '',
    gender: '',
    genre: '',
    filmsAmount: '',
  };

  useEffect(() => {
    if (localStorage.getItem('username')) history.push('/films');
  }, [history]);

  return (
    <WrapperColumn alignSide="center">
      <Text>Username</Text>
      <Input 
        name="user"
        value={username}
        onChange={(({ target }: React.ChangeEvent<HTMLInputElement>) => setUsername(target.value))}
      />
      <Link to="/films">
        <ButtonWithBorderRadius
          withMargin="10px"
          onClick={() => {
            if (username) {
              localStorage.setItem('userInfo', JSON.stringify({ username, ...userInfoInitialState }));
              localStorage.setItem('isAuthenticated', 'true');
              setUser({ username });
              setIsLogged(true);
            } else {
              alert('Input cannot be empty');
            }
          }}
        >
          Confirm
        </ButtonWithBorderRadius>
      </Link>
    </WrapperColumn>
  );
};

export default connect(null, mapDispatchToProps)(Login);
