import React, { useState, useEffect, Dispatch } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  WrapperColumn, Text, Input, ButtonWithBorderRadius,
} from 'atoms/atoms.styled';
import { SET_IS_LOGGED, SET_USER } from 'actions/actionTypes';
import { connect } from 'react-redux';
import { IUserAction } from 'interfaces/userAction.interface';
import { getUser, setUser } from 'api/users';
import { IRootStore } from 'store';
import { IUser } from 'interfaces/user.interface';

interface IProps {
  isLogged: boolean;
  setIsLogged: (e: boolean) => void;
  setUserData: (f: IUser) => void;
}

const mapStateToProps = (state: IRootStore) => {
  return {
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserData: (payload: IUser) => 
    dispatch({ type: SET_USER, payload }),
  setIsLogged: (payload: boolean) =>
    dispatch({ type: SET_IS_LOGGED, payload }),
});

const Login = ({ setIsLogged, isLogged, setUserData }: IProps) => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  useEffect(() => {
    getUser()
      .then((res) => {
        if (res.find((u: IUser) => u.username === username) && isLogged) history.push('/films');
      });
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
              localStorage.setItem('isAuthenticated', 'true');
              setUserData({ username });
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
