import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumn, Text, Input, ButtonWithBorderRadius,
} from 'atoms/atoms.styled';
import { observer } from 'mobx-react';
import { useStore } from 'stores/root-store';

const Login = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { userStore } = useStore();

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
              userStore.setUser({ username });
              userStore.setIsLogged(true);
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

export default observer(Login);