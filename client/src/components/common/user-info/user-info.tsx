import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import { Text, WrapperColumn, ButtonWithBorderRadius } from 'atoms/atoms.styled';
import { IUser } from 'interfaces/user.interface';
import 'react-tabs/style/react-tabs.css';
import { SET_ERROR, SET_USER } from 'actions/actionTypes';
import { IUserAction } from 'interfaces/userAction.interface';
import { getUser } from 'api/users';
import { IError } from 'interfaces/error.interface';

interface IProps {
  user: IUser;
  setEditUserInfo: (b: boolean) => void;
  setUserInfo: (u: IUser) => void;
  setError: (f: IError) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<IUserAction>) => ({
  setUserInfo: (payload: IUser) =>
    dispatch({ type: SET_USER, payload }),
  setError: (payload: IError) =>
    dispatch({ type: SET_ERROR, payload }),
});

const UserInfo = ({ user, setEditUserInfo, setUserInfo, setError }: IProps) => {
  useEffect(() => {
    getUser()
      .then((res) => {
        setUserInfo(res);
      })
      .catch(() => {
        setError({ isError: true, text: 'Error while user data fetching' });
      });
  }, []);
  return (
    <WrapperColumn alignSide="left">
      {user?.login ? <Text>Login: {user.login}</Text> : null}
      {user?.email ? <Text>Email: {user.email}</Text> : null}
      {user?.gender ? <Text>Gender: {user.gender}</Text> : null}
      {user?.genre ? <Text>Favorite genre: {user.genre}</Text> : null}
      {user?.filmsAmount ? <Text>How many films you want to watch in month: {user.filmsAmount}</Text> : null}
      <WrapperColumn alignSide="center">
        <ButtonWithBorderRadius onClick={() => {
          setEditUserInfo(true);
        }}
        >
          Edit
        </ButtonWithBorderRadius>
      </WrapperColumn>
    </WrapperColumn>
  );
};

export default connect(null, mapDispatchToProps)(UserInfo);
