import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumn, Text, Input, ButtonWithBorderRadius,
} from '../../atoms/atoms.styled';

const Login = ({ setIsLogged }) => {
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
      <Input name="user" value={username} onChange={(i) => setUsername(i.target.value)} />
      <Link to="/films">
        <ButtonWithBorderRadius
          withMargin="10px"
          onClick={() => {
            if (username) {
              localStorage.setItem('userInfo', JSON.stringify({ username, ...userInfoInitialState }));
              localStorage.setItem('isAuthenticated', true);
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

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};

export default Login;
