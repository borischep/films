import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  WrapperColumn,
} from '../../atoms/atoms.styled';
import UserInfo from '../user-info';

const Login = () => {
  const history = useHistory();

  return (
    <WrapperColumn alignSide="center">
      <UserInfo
        editInfo
        afterSubmit={() => {
          localStorage.setItem('isAuthenticated', true);
          history.push('/films');
        }}
      />
    </WrapperColumn>
  );
};

export default Login;
