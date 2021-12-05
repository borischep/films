import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumnCenter, Text, Input, ButtonWithBorderRadius,
} from '../../atoms/atoms.styled';

const Login = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('username')) history.push('/films');
  }, [history]);

  return (
    <WrapperColumnCenter>
      <Text>Username</Text>
      <Input name="user" value={username} onChange={(i) => setUsername(i.target.value)} />
      <Link to="/films">
        <ButtonWithBorderRadius onClick={() => {
          localStorage.setItem('username', username);
          localStorage.setItem('isAuthenticated', true);
        }}
        >
          Confirm
        </ButtonWithBorderRadius>
      </Link>
    </WrapperColumnCenter>
  );
};

export default Login;
