import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumn, Text, Input, ButtonWithBorderRadius,
} from 'atoms/atoms.styled';

interface IProps {
  setIsLogged: (e: boolean) => void;
}

const Login = ({ setIsLogged }: IProps) => {
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
      <Input name="user" value={username} onChange={(i: any) => setUsername(i.target.value)} />
      <Link to="/films">
        <ButtonWithBorderRadius
          withMargin="10px"
          onClick={() => {
            if (username) {
              localStorage.setItem('userInfo', JSON.stringify({ username, ...userInfoInitialState }));
              localStorage.setItem('isAuthenticated', 'true');
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

export default Login;
